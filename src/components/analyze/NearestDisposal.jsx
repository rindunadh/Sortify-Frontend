import { useEffect, useMemo, useState } from 'react'
import { fetchLocations, fetchNearestLocations } from '../../services/sortifyApi'

const NEAREST_GROUPS = [
  { id: 'bank_sampah', label: 'Bank Sampah' },
  { id: 'tps', label: 'TPS' },
  { id: 'tpst', label: 'TPST' },
]

/**
 * Step 4 - Nearest disposal: filters nearby facilities by city/search.
 */
function NearestDisposal() {
  const [selectedCity, setSelectedCity] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [locations, setLocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [nearestLocations, setNearestLocations] = useState({})
  const [userLocation, setUserLocation] = useState(null)
  const [isLocating, setIsLocating] = useState(false)
  const [locationMessage, setLocationMessage] = useState('')

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

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage('Your browser does not support location access.')
      return
    }

    setIsLocating(true)
    setLocationMessage('Chrome will ask permission to use your location.')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        try {
          const nearest = await fetchNearestLocations(coords)
          setUserLocation(coords)
          setNearestLocations(nearest)
          setLocationMessage('')
        } catch {
          setNearestLocations({})
          setLocationMessage('Could not load nearest disposal data from the backend.')
        } finally {
          setIsLocating(false)
        }
      },
      (error) => {
        const denied = error.code === error.PERMISSION_DENIED
        setNearestLocations({})
        setLocationMessage(
          denied
            ? 'Location permission was denied. You can still browse by city below.'
            : 'Could not detect your location. You can still browse by city below.'
        )
        setIsLocating(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    )
  }

  const cityOptions = useMemo(
    () => [
      'All',
      ...new Set(locations.map((location) => location.city).filter(Boolean)),
    ],
    [locations]
  )
  const typeOptions = useMemo(
    () => [
      { id: 'All', label: 'All' },
      ...Array.from(
        new Map(
          locations
            .filter((location) => location.typeId || location.type)
            .map((location) => [
              location.typeId || location.type,
              {
                id: location.typeId || location.type,
                label: location.type || location.typeId,
              },
            ])
        ).values()
      ),
    ],
    [locations]
  )

  // Apply all visible filters in one place so the rendered list stays predictable.
  const filteredLocations = locations.filter((location) => {
    const cityMatches = selectedCity === 'All' || location.city === selectedCity
    const typeMatches =
      selectedType === 'All' ||
      location.typeId === selectedType ||
      location.type === selectedType
    const searchMatches =
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase())

    return cityMatches && typeMatches && searchMatches
  })
  const hasNearestResults = NEAREST_GROUPS.some(
    (group) => nearestLocations[group.id]?.length > 0
  )

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

      <div className="nearest-location-panel">
        <div>
          <p className="nearest-panel-kicker">Your location</p>
          <h3>Find the 3 nearest disposal places by type</h3>
          <p>
            Use your browser location to show the closest Bank Sampah, TPS, and
            TPST.
          </p>
        </div>

        <button
          className="btn-primary nearest-location-button"
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
        >
          {isLocating ? 'Detecting...' : 'Use my location'}
        </button>
      </div>

      {locationMessage && (
        <p className="api-status api-status--warning" role="status">
          {locationMessage}
        </p>
      )}

      {userLocation && (
        <p className="nearest-user-location">
          Location detected: {userLocation.lat.toFixed(5)}, {userLocation.lng.toFixed(5)}
        </p>
      )}

      {hasNearestResults && (
        <div className="nearest-results">
          {NEAREST_GROUPS.map((group) => {
            const groupLocations = nearestLocations[group.id] || []

            return (
              <div className="nearest-group" key={group.id}>
                <div className="nearest-group-head">
                  <h3>{group.label}</h3>
                  <span>{groupLocations.length} nearest</span>
                </div>

                {groupLocations.length > 0 ? (
                  <div className="nearest-mini-list">
                    {groupLocations.map((location) => (
                      <article className="nearest-mini-card" key={location.id}>
                        <div>
                          <h4>{location.name}</h4>
                          <p>{location.address}</p>
                          {location.distanceKm > 0 && (
                            <span>{location.distanceKm.toFixed(2)} km away</span>
                          )}
                        </div>

                        <a
                          className="nearest-mini-link"
                          href={
                            location.mapsUrl ||
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              location.address
                            )}`
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          Maps
                        </a>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="nearest-empty">No nearby {group.label} returned yet.</p>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div className="filter-group">
        <span className="filter-label">City</span>
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
      </div>

      <div className="filter-group">
        <span className="filter-label">Disposal Type</span>
        <div className="city-list" aria-label="Filter by disposal option">
          {typeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`city-chip ${
                option.id === selectedType ? 'city-chip--active' : ''
              }`}
              onClick={() => setSelectedType(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
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
