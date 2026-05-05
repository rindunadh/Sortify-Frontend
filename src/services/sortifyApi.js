import { WASTE_CATEGORIES } from '../data/wasteData'

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
).replace(/\/$/, '')

const CATEGORY_ALIASES = {
  organik: 'organic',
  organic: 'organic',
  plastik: 'plastic',
  plastic: 'plastic',
  kertas: 'paper',
  paper: 'paper',
  kardus: 'cardboard',
  cardboard: 'cardboard',
  kaca: 'glass',
  glass: 'glass',
  logam: 'metal',
  metal: 'metal',
  besi: 'metal',
  residu: 'residual',
  residual: 'residual',
  tekstil: 'textile',
  textile: 'textile',
  kain: 'fabric',
  clothes: 'fabric',
  sepatu: 'shoes',
  shoes: 'shoes',
  b3: 'hazardous',
  hazardous: 'hazardous',
  berbahaya: 'hazardous',
}

export function getBackendCategory(categoryId) {
  return WASTE_CATEGORIES[categoryId]?.backendLabel || categoryId
}

export function normalizeCategory(category) {
  const key = String(category || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  return CATEGORY_ALIASES[key] || key || 'residual'
}

function toArray(value) {
  if (!value) return []
  return Array.isArray(value) ? value.filter(Boolean) : [value]
}

function normalizeHandlingMedia(handling) {
  return toArray(handling).flatMap((item, itemIndex) => {
    const label = item?.label || item?.jenis || 'Tutorial'
    const description = item?.description || ''
    const videos = toArray(item?.video_url).map((url, index) => ({
      type: 'video',
      url,
      label,
      description,
      id: `video-${itemIndex}-${index}`,
    }))
    const articles = toArray(item?.article_url).map((url, index) => ({
      type: 'article',
      url,
      label,
      description,
      id: `article-${itemIndex}-${index}`,
    }))

    return [...videos, ...articles]
  })
}

async function apiFetch(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, options)
  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message =
      typeof payload === 'object'
        ? payload.error || payload.detail || 'Request failed'
        : payload || 'Request failed'

    throw new Error(message)
  }

  return payload
}

export async function classifyWasteImage(file) {
  const formData = new FormData()
  formData.append('image', file)

  const payload = await apiFetch('/api/classify/', {
    method: 'POST',
    body: formData,
  })

  const classification = payload.classification || payload
  const recommendation = payload.recommendation
  const category = normalizeCategory(
    classification.category || recommendation?.category
  )
  const confidence = Number(classification.confidence ?? payload.confidence ?? 0)

  return {
    category,
    confidence: confidence > 1 ? confidence / 100 : confidence,
    items: [classification.raw_label || recommendation?.category || category].filter(
      Boolean
    ),
    recommendation,
  }
}

export async function fetchClassifierCategories() {
  const payload = await apiFetch('/api/classify/categories/')
  const categories = payload.categories || []

  return categories.map((category) => {
    const id = normalizeCategory(category)
    return {
      id,
      label: category,
      color: WASTE_CATEGORIES[id]?.color || WASTE_CATEGORIES.residual.color,
    }
  })
}

export async function fetchWasteInfo() {
  const payload = await apiFetch('/api/waste/')
  const categories = payload.categories || []

  return categories.reduce((acc, item) => {
    const id = normalizeCategory(item.category)
    const handling = Array.isArray(item.penanganan)
      ? item.penanganan
      : item.penanganan || item.mandiri
    const tutorials = normalizeHandlingMedia(handling)

    acc[id] = {
      id,
      label: item.category,
      description: item.description,
      steps: item.disposal_instructions || [],
      tutorials,
      tutorialUrl: tutorials[0]?.url,
      facilityType: item.facility?.type,
    }
    return acc
  }, {})
}

export async function fetchLocations() {
  const payload = await apiFetch('/api/locations/')
  const locations = payload.locations || payload

  if (!Array.isArray(locations)) return []

  return locations.map((location) => ({
    id: location.id,
    name: location.name,
    city: location.city,
    type: location.facility_type_display || location.facility_type || 'TPS',
    address: [location.address, location.city, location.province]
      .filter(Boolean)
      .join(', '),
    distanceKm: Number(location.distanceKm ?? location.distance_km ?? 0),
    mapsUrl:
      location.maps_url ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        location.address || location.name
      )}`,
  }))
}
