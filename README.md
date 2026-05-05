# Sortify Frontend
One photo. Right Disposal.
React + Vite web app untuk upload foto sampah, menampilkan hasil klasifikasi AI, rekomendasi pembuangan, tutorial reuse, dan lokasi disposal terdekat dari Sortify backend.

## Setup, panduan menjalankan Sortify frontend di lokal
Pastikan sudah terinstall:
Node.js dan npm

Link instalasi: https://nodejs.org/

# 1. Clone repo FN (harusnya clone repo frontend)
```
git clone https://github.com/rindunadh/Sortify-Frontend.git
cd Sortify-Frontend
```

# 2. Install dependencies
```
npm install
```

# 3. Siapkan backend
Frontend membutuhkan Sortify backend agar fitur AI dan data TPS berjalan.
Jalankan backend terlebih dahulu, steps ada di:
```
https://github.com/ViolinMonica/Sortify-backend/tree/main
```

Endpoint backend yang dipakai frontend:
```
POST /api/classify/      -> klasifikasi foto sampah
GET  /api/waste/         -> rekomendasi dan tutorial disposal
GET  /api/locations/     -> daftar lokasi disposal
```

# 4. Buat file .env (jika perlu)
Secara default frontend akan memanggil backend di:
```
http://localhost:8000
```

Jika backend berjalan di URL lain, buat file `.env` di root frontend:
```
VITE_API_BASE_URL=http://localhost:8000
```

# 5. Jalankan frontend
```
npm run dev
```

Lalu buka:
```
http://localhost:5173
```

## Fitur Frontend

### Landing Page
Halaman utama Sortify berisi pengenalan aplikasi, masalah sampah, solusi, langkah penggunaan, dan dampak.

### Analyze Page
```
/analyze
```
Fitur utama untuk:
- Upload foto sampah
- Mengirim foto ke backend AI classifier
- Menampilkan kategori dan confidence
- Menampilkan cara disposal
- Menampilkan video atau artikel tutorial reuse dari backend
- Menampilkan daftar lokasi disposal dari backend

### About Page
```
/about
```
Halaman informasi mengenai Sortify dan tujuan aplikasi.

## Integrasi Backend

### Klasifikasi Sampah
Frontend mengirim file foto ke:
```
POST /api/classify/
Content-Type: multipart/form-data

Body: image (file) - foto sampah (jpg/png/webp)
```

Response yang digunakan frontend:
```
{
  "success": true,
  "classification": {
    "category": "Textile",
    "raw_label": "shoes",
    "confidence": 0.94
  },
  "recommendation": {
    "category": "Textile",
    "description": "...",
    "disposal_instructions": [...],
    "penanganan": [...]
  }
}
```

Catatan:
`classification.raw_label` dipakai untuk menampilkan detected item, seperti `shoes`, `clothes`, `paper`, atau `cardboard`.
`recommendation.penanganan` dipakai untuk menampilkan video player iframe atau link artikel.

### Rekomendasi Sampah
```
GET /api/waste/
```

Data ini dipakai untuk daftar kategori, langkah disposal, video tutorial, dan artikel jika belum ada hasil klasifikasi spesifik.

### Lokasi Disposal
```
GET /api/locations/
```

Frontend menampilkan semua lokasi dari backend. Filter di frontend hanya berdasarkan:
- Kota
- Tipe fasilitas
- Search nama/alamat

Frontend tidak memfilter lokasi berdasarkan accepted waste category.

# Struktur project
```
hackathon-IYREF/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── figma-assets/             # aset visual publik
├── src/
│   ├── main.jsx                  # entry point React
│   ├── App.jsx                   # routing halaman
│   ├── assets/                   # aset internal
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── analyze/
│   │       ├── UploadStep.jsx
│   │       ├── ResultStep.jsx
│   │       ├── DisposalSteps.jsx
│   │       └── NearestDisposal.jsx
│   ├── data/
│   │   └── wasteData.js          # fallback demo data frontend
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Analyze.jsx
│   │   └── About.jsx
│   ├── sections/                 # sections landing page
│   ├── services/
│   │   └── sortifyApi.js         # integrasi API backend
│   └── styles/
│       ├── landing.css
│       ├── analyze.css
│       └── about-new.css
└── dist/                         # hasil build production
```

## Scripts
| Command           | Fungsi                          |
|-------------------|---------------------------------|
| `npm run dev`     | Menjalankan frontend lokal      |
| `npm run build`   | Build production ke folder dist |
| `npm run preview` | Preview hasil build             |
| `npm run lint`    | Menjalankan ESLint              |

## Kategori Sampah
Kategori mengikuti response dari backend classifier dan recommendation engine.

| Label Model        | Kategori Sortify |
|--------------------|------------------|
| battery            | B3               |
| biological         | Organic          |
| cardboard, paper   | Paper            |
| clothes, shoes     | Textile          |
| glass              | Glass            |
| metal              | Metal            |
| plastic            | Plastic          |
| trash              | Residue          |

## Troubleshooting

### Error "Showing a local demo result until the backend is ready"
Artinya frontend gagal menerima response sukses dari backend. Pastikan:
- Backend sudah berjalan di `http://localhost:8000`
- `VITE_API_BASE_URL` sudah sesuai
- Endpoint `/api/classify/`, `/api/waste/`, dan `/api/locations/` bisa diakses

### Error "Model not found"
Error ini berasal dari backend. Pastikan model AI sudah tersedia dan `AI_MODEL_PATH` backend sudah sesuai.

### Lokasi disposal tidak muncul
Pastikan backend sudah menjalankan seed lokasi:
```
python scripts/seed_locations.py
```

Lalu cek:
```
http://localhost:8000/api/locations/
```
