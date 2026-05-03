// ============================================================
// App.jsx — le cerveau de l'application
//
// NOUVEAUTÉ : on appelle maintenant 2 endpoints API en parallèle
//   1. /weather   → météo actuelle (température, humidité...)
//   2. /forecast  → prévisions toutes les 3h sur 5 jours
//      → on prend juste les 8 premières entrées = 24h
//      → utilisées pour le graphique à droite
//
// Promise.all([fetch1, fetch2]) → les 2 requêtes partent
// en même temps, on attend que les 2 soient finies.
// ============================================================

import { useState, useEffect } from 'react'
import SearchBar    from './components/SearchBar'
import WeatherCard  from './components/WeatherCard'
import ForecastChart from './components/ForecastChart'
import Loader       from './components/Loader'
import './App.css'

const API_KEY  = import.meta.env.VITE_WEATHER_API_KEY || ''
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

function App() {
  const [city, setCity]         = useState('London')
  const [weather, setWeather]   = useState(null)   // /weather response
  const [forecast, setForecast] = useState(null)   // /forecast response
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  // ── fetchWeather ─────────────────────────────────────────
  // Appelle les 2 endpoints en parallèle avec Promise.all
  const fetchWeather = async (cityName) => {
    setLoading(true)
    setError('')
    setWeather(null)
    setForecast(null)

    // On construit les 2 URLs
    const weatherUrl  = `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    const forecastUrl = `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric&cnt=8`
    //                                                                                    ^^^^
    //   cnt=8 → on demande seulement 8 entrées (3h × 8 = 24h)
    //   chaque entrée = snapshot météo à un moment donné

    try {
      // Promise.all lance les 2 fetch EN MÊME TEMPS
      // et attend que les DEUX soient finis avant de continuer
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ])

      if (!weatherRes.ok) {
        if (weatherRes.status === 401) throw new Error('Clé API invalide — vérifie ton .env')
        if (weatherRes.status === 404) throw new Error(`Ville "${cityName}" introuvable`)
        throw new Error('Erreur serveur')
      }

      // On convertit les 2 réponses en JSON
      const weatherData  = await weatherRes.json()
      const forecastData = await forecastRes.json()

      setWeather(weatherData)
      setForecast(forecastData)   // forecastData.list = tableau de 8 snapshots

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(city)
  }, [])

  const handleSearch = (newCity) => {
    setCity(newCity)
    fetchWeather(newCity)
  }

  return (
    <div className="app">

      <header className="app-header">
        <div className="logo">
          <span className="logo-dot" />
          <h1 className="app-title">Skycast</h1>
        </div>
        <SearchBar onSearch={handleSearch} />
      </header>

      <main className="app-main">
        {loading && <Loader />}

        {error && !loading && (
          <div className="error-box">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {weather && forecast && !loading && !error && (
          <div className="dashboard">
            {/* Colonne gauche : météo actuelle */}
            <WeatherCard weather={weather} />

            {/* Colonne droite : graphique 24h */}
            {/* forecast.list = les 8 snapshots toutes les 3h */}
            <ForecastChart forecastList={forecast.list} />
          </div>
        )}
      </main>

    </div>
  )
}

export default App
