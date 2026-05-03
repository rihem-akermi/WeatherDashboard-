// ============================================================
// WeatherCard.jsx — affiche les données météo
//
// CE QUE CE COMPOSANT FAIT :
//   - Reçoit l'objet JSON de l'API via la prop "weather"
//   - Affiche les informations : ville, température, etc.
//
// PROPS REÇUES :
//   weather → l'objet JSON retourné par OpenWeatherMap
//
// STRUCTURE DE L'OBJET "weather" (ce que l'API nous envoie) :
// {
//   name: "London",                → nom de la ville
//   sys: { country: "GB" },       → code pays
//   main: {
//     temp: 14.2,                  → température actuelle en °C
//     feels_like: 13.0,            → température ressentie
//     humidity: 72,                → humidité en %
//     pressure: 1013               → pression en hPa
//   },
//   weather: [{                    → tableau (on prend [0])
//     description: "light rain",   → description en anglais
//     icon: "10d"                  → code de l'icône météo
//   }],
//   wind: {
//     speed: 5.1                   → vitesse du vent en m/s
//   },
//   visibility: 10000,             → visibilité en mètres
//   dt: 1703325600,                → date/heure en Unix timestamp
//   sys: {
//     sunrise: 1703308800,         → lever du soleil (Unix)
//     sunset:  1703340000          → coucher du soleil (Unix)
//   }
// }
// ============================================================

import './WeatherCard.css'

// Fonction utilitaire : convertit un Unix timestamp en heure lisible
// Ex: 1703308800 → "7:28 AM"
function formatTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000) // × 1000 car JS utilise les ms
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Fonction utilitaire : convertit les degrés en point cardinal
// Ex: 220 → "SO"
function windDirection(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']
  return dirs[Math.round(deg / 45) % 8]
}

function WeatherCard({ weather }) {

  // On destructure l'objet pour accéder plus facilement aux propriétés
  // Au lieu de écrire weather.main.temp, on écrit juste temp
  const { name, sys, main, weather: conditions, wind, visibility } = weather

  // L'API retourne weather comme un TABLEAU → on prend le premier élément [0]
  const condition = conditions[0]

  // URL de l'icône météo — OpenWeatherMap fournit des icônes gratuites
  // Le code icône vient de condition.icon (ex: "10d", "01n")
  // @2x = version haute résolution (64×64 pixels)
  const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`

  return (
    <div className="weather-card">

      {/* EN-TÊTE : ville + pays + description */}
      <div className="card-header">
        <div>
          <h2 className="city-name">{name}, {sys.country}</h2>
          <p className="condition-text">{condition.description}</p>
        </div>
        <img
          className="weather-icon"
          src={iconUrl}
          alt={condition.description}
        />
      </div>

      {/* TEMPÉRATURE PRINCIPALE */}
      <div className="temp-main">
        <span className="temp-value">{Math.round(main.temp)}</span>
        <span className="temp-unit">°C</span>
      </div>
      <p className="temp-feels">
        Ressenti {Math.round(main.feels_like)}°C
      </p>

      {/* GRILLE DE STATS */}
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

      {/* LEVER / COUCHER DU SOLEIL */}
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
