import { useState } from 'react';
import { getCurrentWeather } from '@/services/weatherApi.js';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await getCurrentWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Weather App</h1>
        
        <div className="flex gap-2 mb-4">
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ingresa una ciudad"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {weather && (
          <div className="bg-card p-4 rounded border">
            <h2 className="text-xl font-semibold mb-2">{weather.name}, {weather.sys.country}</h2>
            <p className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</p>
            <p className="capitalize">{weather.weather[0].description}</p>
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Sensación térmica: {Math.round(weather.main.feels_like)}°C</p>
              <p>Humedad: {weather.main.humidity}%</p>
              <p>Viento: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;