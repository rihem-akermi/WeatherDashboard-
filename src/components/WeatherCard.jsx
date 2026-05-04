import './WeatherCard.css'

function formatTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000) // js en ms 
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

function windDirection(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']
  return dirs[Math.round(deg / 45) % 8]
}

function WeatherCard({ weather }) {

  const { name, sys, main, weather: features, wind, visibility } = weather

  const feature = features[0]

  const iconUrl = `https://openweathermap.org/img/wn/${feature.icon}@2x.png`

  return (
    <div className="weather-card">

      <div className="card-header">
        <div>
          <h2 className="city-name">{name}, {sys.country}</h2>
          <p className="feature-text">{feature.description}</p>
        </div>
        <img
          className="weather-icon"
          src={iconUrl}
          alt={feature.description}
        />
      </div>

      <div className="temp-main">
        <span className="temp-value">{Math.round(main.temp)}</span>
        <span className="temp-unit">°C</span>
      </div>
      <p className="temp-feels">
        Ressenti {Math.round(main.feels_like)}°C
      </p>

      <div className="stats-grid">
        <div className="stat">
          <span className="stat-label">Humidité</span>
          <span className="stat-value">{main.humidity}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Vent</span>
          {/* wind.speed en m/s, wind.deg en degrés → on convertit */}
          <span className="stat-value">{wind.speed} m/s {windDirection(wind.deg)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Pression</span>
          <span className="stat-value">{main.pressure} hPa</span>
        </div>
        <div className="stat">
          <span className="stat-label">Visibilité</span>
          {/* visibility est en mètres → on divise par 1000 pour avoir km */}
          <span className="stat-value">{(visibility / 1000).toFixed(1)} km</span>
        </div>
      </div>

      <div className="sun-row">
        <div className="sun-item">
          <span className="sun-label">🌅 Lever</span>
          {/* sys.sunrise est un Unix timestamp → on le convertit */}
          <span className="sun-time">{formatTime(sys.sunrise)}</span>
        </div>
        <div className="sun-divider" />
        <div className="sun-item">
          <span className="sun-label">🌇 Coucher</span>
          <span className="sun-time">{formatTime(sys.sunset)}</span>
        </div>
      </div>

    </div>
  )
}

export default WeatherCard
