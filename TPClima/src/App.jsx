import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_KEY = '38d94c5f72665cea98e2635d83720e01'

  const fetchWeather = async () => {
    if (!city) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      )
      
      
      if (!response.ok) {
        throw new Error('Ciudad no encontrada')
      }
      
      const data = await response.json()
      console.log(data) 
      setWeatherData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchWeather()
  }

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ingresa una ciudad..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-card">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <div className="weather-main">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <div>
              <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
              <p>{weatherData.weather[0].description}</p>
            </div>
          </div>
          <div className="weather-details">
            <p>Humedad: {weatherData.main.humidity}%</p>
            <p>Viento: {weatherData.wind.speed} m/s</p>
            <p>Viento deg: {weatherData.wind.deg}</p>
            <p>Mín: {Math.round(weatherData.main.temp_min)}°C</p>
            <p>Máx: {Math.round(weatherData.main.temp_max)}°C</p>
            <p>Sea level: {weatherData.main.sea_level}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
