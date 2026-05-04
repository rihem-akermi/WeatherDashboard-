import { useState, useEffect } from 'react'
import SearchBar    from './components/SearchBar'
import WeatherCard  from './components/WeatherCard'
import ForecastChart from './components/ForecastChart'
import Loader       from './components/Loader'
import './App.css'

// used server : OpenWeatherMap 

const API_KEY  = import.meta.env.VITE_WEATHER_API_KEY || ''
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

function App() {
  const [city, setCity]         = useState('London')
  const [weather, setWeather]   = useState(null)   
  const [forecast, setForecast] = useState(null)  
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')


  const fetchWeather = async (cityName) => {
    setLoading(true)
    setError('')
    setWeather(null)
    setForecast(null)

    const weatherUrl  = `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    const forecastUrl = `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric&cnt=8`
   
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ])


      if (!weatherRes.ok ||  !forecastRes.ok ) {
        if (weatherRes.status === 401 || forecastRes.status === 401) {
          throw new Error('Clé API invalide !')}
        if (weatherRes.status === 404) {
          throw new Error(`Ville "${cityName}" introuvable`)}
        if (forecastRes.status === 404) {
            throw new Error(`Prévisions indisponibles pour "${cityName}"`)}
        throw new Error('Erreur serveur')
      }


      const weatherData  = await weatherRes.json()
      const forecastData = await forecastRes.json()

      console.log(weatherData)
      console.log(forecastData)

      setWeather(weatherData)
      setForecast(forecastData)   // forecastData.list = tableau de 8 snapshots [1 jour]

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
          <span className="logo-ice">❄️</span>
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
            <WeatherCard weather={weather} />
            <ForecastChart forecastList={forecast.list} />
          </div>
        )}
      </main>

    </div>
  )
}

export default App
