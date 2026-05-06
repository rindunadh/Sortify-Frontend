// Central data source for the Analyze flow.
// Keeping these values in one file makes every result card and guide stay in sync.
export const WASTE_CATEGORIES = {
  organic: {
    id: 'organic',
    label: 'Organic',
    backendLabel: 'Organik',
    color: '#22c55e',
    description:
      'Food scraps, leaves, and other natural materials that can break down into compost.',
  },
  plastic: {
    id: 'plastic',
    label: 'Plastic',
    backendLabel: 'Plastik',
    color: '#3b82f6',
    description:
      'Bottles, wrappers, containers, and synthetic packaging that should be cleaned before recycling.',
  },
  paper: {
    id: 'paper',
    label: 'Paper',
    backendLabel: 'Kertas',
    color: '#f59e0b',
    description:
      'Cardboard, notebooks, paper bags, and clean paper products that can usually be recycled.',
  },
  cardboard: {
    id: 'cardboard',
    label: 'Cardboard',
    backendLabel: 'Kardus',
    color: '#d97706',
    description:
      'Cardboard boxes and thick paper packaging that should be flattened before recycling.',
  },
  glass: {
    id: 'glass',
    label: 'Glass',
    backendLabel: 'Kaca',
    color: '#14b8a6',
    description:
      'Jars, bottles, and broken glass that need careful handling before being sent to recycling.',
  },
  hazardous: {
    id: 'hazardous',
    label: 'B3',
    backendLabel: 'B3',
    color: '#ef4444',
    description:
      'Batteries, chemicals, electronics, and medical waste that need special disposal handling.',
  },
  metal: {
    id: 'metal',
    label: 'Metal',
    backendLabel: 'Logam',
    color: '#64748b',
    description:
      'Cans, scrap metal, and other metal items that can usually be collected by waste banks or scrap dealers.',
  },
  residual: {
    id: 'residual',
    label: 'Residual',
    backendLabel: 'Residu',
    color: '#78716c',
    description:
      'Mixed or contaminated waste that cannot be recycled and should go to regular TPS collection.',
  },
  textile: {
    id: 'textile',
    label: 'Textile',
    backendLabel: 'Tekstil',
    color: '#a855f7',
    description:
      'Clothes, shoes, and fabrics that can be donated when usable or discarded as residual waste when damaged.',
  },
  fabric: {
    id: 'fabric',
    label: 'Fabric',
    backendLabel: 'Kain',
    color: '#a855f7',
    description:
      'Clothing and fabric waste that can be donated, reused, or handled as residual waste when damaged.',
  },
  shoes: {
    id: 'shoes',
    label: 'Shoes',
    backendLabel: 'Sepatu',
    color: '#8b5cf6',
    description:
      'Used footwear that can be repaired, donated, upcycled, or discarded through TPS when unusable.',
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
  cardboard: [
    'Keep cardboard dry and free from food contamination.',
    'Remove plastic tape or labels when possible.',
    'Flatten the box so it takes less space.',
    'Bring it to a paper recycling bin, collector, or waste bank.',
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
  metal: [
    'Rinse cans or metal containers if they held food or drinks.',
    'Flatten safe items to save storage space.',
    'Collect sharp metal separately so handlers do not get injured.',
    'Bring it to a waste bank or scrap metal collector.',
  ],
  residual: [
    'Separate recyclable material first if any part can still be recovered.',
    'Wrap wet or sharp residual waste safely.',
    'Put it in the mixed waste bin for regular TPS collection.',
    'Reduce similar unrecyclable packaging in future purchases.',
  ],
  textile: [
    'Check whether the textile is still clean and wearable.',
    'Donate usable clothes, shoes, or fabric to a social organization.',
    'Repurpose damaged fabric as cleaning cloth when possible.',
    'Discard unusable textiles through TPS collection.',
  ],
  fabric: [
    'Check whether the fabric is still clean and usable.',
    'Donate wearable clothes to a social organization.',
    'Upcycle damaged fabric into cleaning cloth or crafts.',
    'Discard unusable fabric through TPS collection.',
  ],
  shoes: [
    'Check whether the shoes can still be repaired or worn.',
    'Donate usable shoes to a trusted donation channel.',
    'Clean and dry shoes before donating or storing.',
    'Discard unusable shoes through TPS collection.',
  ],
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
