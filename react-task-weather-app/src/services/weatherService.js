const API_KEY = '252c1b0fcaee45c88bc212917251003';
const BASE_URL = 'https://api.weatherapi.com/v1';

// List of cities from different countries
export const CAPITAL_CITIES = [
    // Albanian Cities
    { city: 'Tirana', country: 'Albania' },
    { city: 'Durrës', country: 'Albania' },
    { city: 'Vlorë', country: 'Albania' },
    { city: 'Elbasan', country: 'Albania' },
    { city: 'Shkodër', country: 'Albania' },
    { city: 'Fier', country: 'Albania' },
    { city: 'Korçë', country: 'Albania' },
    { city: 'Berat', country: 'Albania' },
    { city: 'Lushnjë', country: 'Albania' },
    { city: 'Pogradec', country: 'Albania' },
    { city: 'Kavajë', country: 'Albania' },
    { city: 'Gjirokastër', country: 'Albania' },
    { city: 'Lezhë', country: 'Albania' },
    { city: 'Kuçovë', country: 'Albania' },
    // European Capitals
    { city: 'London', country: 'United Kingdom' },
    { city: 'Paris', country: 'France' },
    { city: 'Berlin', country: 'Germany' },
    { city: 'Rome', country: 'Italy' },
    { city: 'Madrid', country: 'Spain' },
    { city: 'Amsterdam', country: 'Netherlands' },
    { city: 'Brussels', country: 'Belgium' },
    { city: 'Vienna', country: 'Austria' },
    { city: 'Stockholm', country: 'Sweden' },
    { city: 'Oslo', country: 'Norway' },
    { city: 'Copenhagen', country: 'Denmark' },
    { city: 'Helsinki', country: 'Finland' },
    { city: 'Dublin', country: 'Ireland' },
    { city: 'Lisbon', country: 'Portugal' }
];

/**
 * Fetches weather data for a specific city
 * @param {Object} cityInfo - Object containing city and country information
 * @returns {Promise} Weather data for the specified city
 */
export const getWeatherForCity = async (cityInfo) => {
    try {
        const response = await fetch(
            `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(cityInfo.city)}&aqi=no`
        );
        
        if (!response.ok) {
            throw new Error(`Weather API Error: ${response.status}`);
        }

        const data = await response.json();
        return {
            ...data,
            country: cityInfo.country // Add the country information to the response
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

/**
 * Fetches weather data for all capital cities
 * @returns {Promise} Weather data for all cities
 */
export const getWeatherForAllCities = async () => {
    try {
        const weatherPromises = CAPITAL_CITIES.map(city => getWeatherForCity(city));
        const weatherData = await Promise.all(weatherPromises);
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data for all cities:', error);
        throw error;
    }
}; 