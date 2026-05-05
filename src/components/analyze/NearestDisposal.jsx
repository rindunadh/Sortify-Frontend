import { useEffect, useMemo, useState } from 'react'
import { fetchLocations } from '../../services/sortifyApi'

/**
 * Step 4 - Nearest disposal: filters nearby facilities by city/search.
 */
function NearestDisposal() {
  const [selectedCity, setSelectedCity] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [locations, setLocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchLocations()
      .then((apiLocations) => {
        if (isMounted) {
          
          console.log(apiLocations)
          setLocations(apiLocations)
          setLoadError('')
        }
      })
      .catch(() => {
        if (isMounted) {
          setLocations([])
          setLoadError('Backend TPS data is unavailable right now.')
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const cityOptions = useMemo(
    () => [
      'All',
      ...new Set(locations.map((location) => location.city).filter(Boolean)),
    ],
    [locations]
  )

  // Apply all visible filters in one place so the rendered list stays predictable.
  const filteredLocations = locations.filter((location) => {
    const cityMatches = selectedCity === 'All' || location.city === selectedCity
    const searchMatches =
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase())

    return cityMatches && searchMatches
  })

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
      </div>

      <div className="city-list" aria-label="Filter by city">
        {cityOptions.map((city) => (
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
        {isLoading && (
          <p className="location-empty">
            Loading TPS locations...
          </p>
        )}

        {loadError && !isLoading && (
          <p className="api-status api-status--warning" role="status">
            {loadError}
          </p>
        )}

        {filteredLocations.map((location) => (
          <article className="location-card" key={location.id}>
            <div className="location-card-head">
              <h3>{location.name}</h3>
              <span className="location-type">{location.type}</span>
            </div>

            <p className="location-address">{location.address}</p>

            <div className="location-meta">
              {location.distanceKm > 0 && (
                <span className="location-distance">
                  {location.distanceKm.toFixed(1)} km away
                </span>
              )}

            </div>

            <a
              className="btn-primary btn-navigate"
              href={
                location.mapsUrl ||
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  location.address
                )}`
              }
              target="_blank"
              rel="noreferrer"
            >
              Open Maps
            </a>
          </article>
        ))}

        {!isLoading && filteredLocations.length === 0 && (
          <p className="location-empty">
            No disposal locations match your filters yet.
          </p>
        )}
      </div>
    </section>
  )
}

export default NearestDisposal
