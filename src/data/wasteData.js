// Central data source for the Analyze flow.
// Keeping these values in one file makes every result card and guide stay in sync.
export const WASTE_CATEGORIES = {
  organic: {
    id: 'organic',
    label: 'Organic',
    color: '#22c55e',
    description:
      'Food scraps, leaves, and other natural materials that can break down into compost.',
  },
  plastic: {
    id: 'plastic',
    label: 'Plastic',
    color: '#3b82f6',
    description:
      'Bottles, wrappers, containers, and synthetic packaging that should be cleaned before recycling.',
  },
  paper: {
    id: 'paper',
    label: 'Paper',
    color: '#f59e0b',
    description:
      'Cardboard, notebooks, paper bags, and clean paper products that can usually be recycled.',
  },
  glass: {
    id: 'glass',
    label: 'Glass',
    color: '#14b8a6',
    description:
      'Jars, bottles, and broken glass that need careful handling before being sent to recycling.',
  },
  hazardous: {
    id: 'hazardous',
    label: 'Hazardous',
    color: '#ef4444',
    description:
      'Batteries, chemicals, electronics, and medical waste that need special disposal handling.',
  },
}

// A list version is useful when the UI needs to render category buttons in order.
export const CATEGORY_LIST = Object.values(WASTE_CATEGORIES)

export const DISPOSAL_STEPS = {
  organic: [
    'Separate organic waste from plastic, metal, or glass packaging.',
    'Drain extra liquid so it does not smell or attract insects.',
    'Place it in a compost bin, biopore hole, or organic waste collection container.',
    'Use the compost for plants once it has fully decomposed.',
  ],
  plastic: [
    'Empty the container or wrapper before sorting it.',
    'Rinse and dry bottles or containers to avoid contamination.',
    'Flatten bottles to save space in the recycling bag.',
    'Send it to a recycling point, waste bank, or plastic collection program.',
  ],
  paper: [
    'Keep paper dry and separate from food waste.',
    'Remove plastic tape, stickers, or laminated covers when possible.',
    'Flatten cardboard boxes and stack paper neatly.',
    'Deliver it to a paper recycling bin or waste bank.',
  ],
  glass: [
    'Rinse bottles or jars before disposal.',
    'Wrap broken glass in thick paper to protect handlers.',
    'Separate glass from mixed household waste.',
    'Bring it to a glass recycling drop-off point or waste bank that accepts glass.',
  ],
  hazardous: [
    'Do not mix hazardous waste with regular household trash.',
    'Keep the item in its original container when possible.',
    'Seal leaking batteries, chemicals, or medical waste safely.',
    'Take it to an official hazardous waste drop-off or special collection event.',
  ],
}

export const TUTORIAL_LINKS = {
  organic: 'https://www.youtube.com/results?search_query=home+composting+tutorial',
  plastic: 'https://www.youtube.com/results?search_query=plastic+waste+reuse+tutorial',
  paper: 'https://www.youtube.com/results?search_query=paper+recycling+craft+tutorial',
  glass: 'https://www.youtube.com/results?search_query=glass+bottle+reuse+tutorial',
  hazardous:
    'https://www.youtube.com/results?search_query=hazardous+waste+disposal+safety',
}

export const DISPOSAL_LOCATIONS = [
  {
    id: 1,
    name: 'Bank Sampah Hijau Lestari',
    city: 'Jakarta',
    type: 'Waste Bank',
    address: 'Jl. Kemang Raya No. 18, Jakarta Selatan',
    distanceKm: 1.8,
    accepts: ['plastic', 'paper', 'glass'],
  },
  {
    id: 2,
    name: 'TPS 3R Cempaka',
    city: 'Jakarta',
    type: 'TPS 3R',
    address: 'Jl. Cempaka Putih Barat No. 7, Jakarta Pusat',
    distanceKm: 3.4,
    accepts: ['organic', 'plastic', 'paper'],
  },
  {
    id: 3,
    name: 'Drop Box E-Waste Mall Bandung',
    city: 'Bandung',
    type: 'Special Drop-off',
    address: 'Jl. Merdeka No. 56, Bandung',
    distanceKm: 2.2,
    accepts: ['hazardous'],
  },
  {
    id: 4,
    name: 'Bank Sampah Melati',
    city: 'Bandung',
    type: 'Waste Bank',
    address: 'Jl. Sukajadi No. 21, Bandung',
    distanceKm: 4.1,
    accepts: ['plastic', 'paper'],
  },
  {
    id: 5,
    name: 'Recycle Corner Surabaya',
    city: 'Surabaya',
    type: 'Recycling Point',
    address: 'Jl. Raya Darmo No. 95, Surabaya',
    distanceKm: 2.9,
    accepts: ['plastic', 'paper', 'glass'],
  },
  {
    id: 6,
    name: 'Kompos Komunal Wonokromo',
    city: 'Surabaya',
    type: 'Compost Site',
    address: 'Jl. Wonokromo Timur No. 12, Surabaya',
    distanceKm: 5.2,
    accepts: ['organic'],
  },
]

const KEYWORD_MAP = [
  {
    category: 'organic',
    keywords: ['food', 'leaf', 'leaves', 'banana', 'apple', 'rice', 'vegetable'],
    items: ['food scraps', 'organic residue'],
  },
  {
    category: 'plastic',
    keywords: ['plastic', 'bottle', 'wrapper', 'cup', 'bag', 'sachet'],
    items: ['plastic packaging', 'bottle or wrapper'],
  },
  {
    category: 'paper',
    keywords: ['paper', 'cardboard', 'box', 'book', 'newspaper', 'carton'],
    items: ['paper material', 'cardboard'],
  },
  {
    category: 'glass',
    keywords: ['glass', 'jar', 'bottle', 'ceramic'],
    items: ['glass container', 'bottle or jar'],
  },
  {
    category: 'hazardous',
    keywords: ['battery', 'medicine', 'chemical', 'paint', 'lamp', 'electronic'],
    items: ['hazardous item', 'special handling waste'],
  },
]

// Temporary classifier for the hackathon demo.
// It uses the uploaded filename as a hint until a real AI model/API is connected.
export function classifyWaste(file) {
  const filename = file?.name?.toLowerCase() || ''
  const match = KEYWORD_MAP.find(({ keywords }) =>
    keywords.some((keyword) => filename.includes(keyword))
  )

  const picked = match || KEYWORD_MAP[Math.floor(Math.random() * KEYWORD_MAP.length)]

  return {
    category: picked.category,
    confidence: match ? 0.91 : 0.78,
    items: picked.items,
  }
}
