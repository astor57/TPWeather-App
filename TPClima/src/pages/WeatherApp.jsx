import { useState, useEffect } from 'react';
import './weatherapp.css';

export default function App() {
  const [weatherType, setWeatherType] = useState('clear'); // Puedes cambiarlo según la API

  // Fondo dinámico basado en el clima
  const getWeatherBackground = () => {
    switch(weatherType.toLowerCase()) {
      case 'clear':
        return 'sunny';
      case 'clouds':
        return 'cloudy';
      case 'rain':
        return 'rainy';
      case 'snow': 
        return 'snowy';
      case 'thunderstorm':
        return 'stormy';
      default:
        return 'default';
    }
  };

  return (
    <div className={`weather-app ${getWeatherBackground()}-bg`}>
      {/* Tu contenido de la aplicación aquí */}
      <h1>Aplicación del Clima</h1>
      
      {/* Ejemplo de selector para probar los fondos */}
      <div className="weather-selector">
        <select 
          value={weatherType} 
          onChange={(e) => setWeatherType(e.target.value)}
        >
          <option value="clear">Despejado</option>
          <option value="clouds">Nublado</option>
          <option value="rain">Lluvia</option>
          <option value="snow">Nieve</option>
          <option value="thunderstorm">Tormenta</option>
        </select>
      </div>
    </div>
  );
}
