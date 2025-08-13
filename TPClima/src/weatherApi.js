const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get API key from localStorage or prompt user
const getApiKey = () => {
  let apiKey = localStorage.getItem('weather_api_key');
  

    if (apiKey) {
      localStorage.setItem('weather_api_key', apiKey);
    }
  
  return apiKey;
};

export const getCurrentWeather = async (city) => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key required');
  
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('Weather data not found');
  }
  
  return response.json();
};

// Fetch current weather by coordinates
export const getCurrentWeatherByCoords = async (lat, lon) => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key required');
  
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('Weather data not found');
  }
  
  return response.json();
};

// Fetch 5-day forecast (includes 3-hour intervals)
export const getForecast = async (city) => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key required');
  
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${apiKey}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('Forecast data not found');
  }
  
  return response.json();
};

// Fetch forecast by coordinates
export const getForecastByCoords = async (lat, lon) => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key required');
  
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('Forecast data not found');
  }
  
  return response.json();
};

// Clear stored API key (for testing or changing key)
export const clearApiKey = () => {
  localStorage.removeItem('weather_api_key');
};