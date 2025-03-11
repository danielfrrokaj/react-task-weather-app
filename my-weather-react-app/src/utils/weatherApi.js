// WeatherAPI.com API key
const API_KEY = '252c1b0fcaee45c88bc212917251003';
const BASE_URL = 'https://api.weatherapi.com/v1';

/**
 * Fetches current weather data for a specific location using WeatherAPI.com
 * @param {string} city - City name
 * @returns {Promise} - Promise that resolves to weather data
 */
export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch weather data');
    }
    
    return await response.json(); // This will return all weather data including humidity
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Albanian cities list
 */
export const ALBANIAN_CITIES = [
  'Tirana',
  'Durrës',
  'Vlorë',
  'Shkodër',
  'Elbasan',
  'Fier',
  'Korçë',
  'Berat',
  'Lushnjë',
  'Pogradec',
  'Kavajë',
  'Gjirokastër',
  'Sarandë',
  'Peshkopi',
  'Kukës'
]; 