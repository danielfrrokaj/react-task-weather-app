const API_KEY = '252c1b0fcaee45c88bc212917251003';
const BASE_URL = 'https://api.weatherapi.com/v1';

// List of major Albanian cities
export const ALBANIAN_CITIES = [
    'Tirana',
    'Durrës',
    'Vlorë',
    'Elbasan',
    'Shkodër',
    'Fier',
    'Korçë',
    'Berat',
    'Lushnjë',
    'Pogradec',
    'Kavajë',
    'Gjirokastër',
    'Lezhë',
    'Kuçovë'
];

/**
 * Fetches weather data for a specific Albanian city
 * @param {string} city - Name of the Albanian city
 * @returns {Promise} Weather data for the specified city
 */
export const getWeatherForCity = async (city) => {
    try {
        const response = await fetch(
            `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
        );
        
        if (!response.ok) {
            throw new Error(`Weather API Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

/**
 * Fetches weather data for all Albanian cities
 * @returns {Promise} Weather data for all cities
 */
export const getWeatherForAllCities = async () => {
    try {
        const weatherPromises = ALBANIAN_CITIES.map(city => getWeatherForCity(city));
        const weatherData = await Promise.all(weatherPromises);
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data for all cities:', error);
        throw error;
    }
}; 