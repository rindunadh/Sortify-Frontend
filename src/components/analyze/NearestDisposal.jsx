import { useMemo, useState } from 'react'
import {
  CATEGORY_LIST,
  DISPOSAL_LOCATIONS,
  WASTE_CATEGORIES,
} from '../../data/wasteData'

/**
 * Step 4 - Nearest disposal: filters nearby facilities by city and waste type.
 * The location data is mocked for the demo, but the UI is ready for API data later.
 */
function NearestDisposal({ detectedCategory }) {
  const [selectedCity, setSelectedCity] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [onlyDetected, setOnlyDetected] = useState(true)

  // Build the city chips from the data so adding a new location updates the UI automatically.
  const cities = useMemo(() => {
    const uniqueCities = DISPOSAL_LOCATIONS.map((location) => location.city)
    return ['All', ...new Set(uniqueCities)]
  }, [])

  // Apply all visible filters in one place so the rendered list stays predictable.
  const filteredLocations = DISPOSAL_LOCATIONS.filter((location) => {
    const cityMatches = selectedCity === 'All' || location.city === selectedCity
    const categoryMatches =
      !onlyDetected || location.accepts.includes(detectedCategory)
    const searchMatches =
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase())

    return cityMatches && categoryMatches && searchMatches
  })

  const detectedLabel = WASTE_CATEGORIES[detectedCategory]?.label || 'Waste'

  return (
    <section className="analyze-card fade-in is-visible">
      <div className="analyze-step-head">
        <span className="step-badge">Step 4</span>
        <h2>Nearest Disposal</h2>
      </div>

      <div className="disposal-toolbar">
        <input
          className="disposal-search"
          type="search"
          placeholder="Search by place or address"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <label className="disposal-filter-toggle">
          <input
            type="checkbox"
            checked={onlyDetected}
            onChange={(event) => setOnlyDetected(event.target.checked)}
          />
          Accepts {detectedLabel}
        </label>
      </div>

      <div className="city-list" aria-label="Filter by city">
        {cities.map((city) => (
          <button
            key={city}
            type="button"
            className={`city-chip ${
              city === selectedCity ? 'city-chip--active' : ''
            }`}
            onClick={() => setSelectedCity(city)}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="location-grid">
        {filteredLocations.map((location) => (
          <article className="location-card" key={location.id}>
            <div className="location-card-head">
              <h3>{location.name}</h3>
              <span className="location-type">{location.type}</span>
            </div>

            <p className="location-address">{location.address}</p>

            <div className="location-meta">
              <span className="location-distance">
                {location.distanceKm.toFixed(1)} km away
              </span>

              <div className="location-accepts" aria-label="Accepted waste">
                {location.accepts.map((categoryId) => (
                  <span
                    key={categoryId}
                    className="category-tag category-tag--sm"
                    style={{
                      background: WASTE_CATEGORIES[categoryId].color,
                    }}
                  >
                    {WASTE_CATEGORIES[categoryId].label}
                  </span>
                ))}
              </div>
            </div>

            <a
              className="btn-primary btn-navigate"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                location.address
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Open Maps
            </a>
          </article>
        ))}

        {filteredLocations.length === 0 && (
          <p className="location-empty">
            No disposal locations match your filters yet.
          </p>
        )}
      </div>
    </section>
  )
}

export default NearestDisposal
