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
    { city: 'Lezhe', country: 'Albania' },
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
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(cityInfo.city)}&days=3&aqi=no`
        );
        
        if (!response.ok) {
            throw new Error(`Weather API Error: ${response.status}`);
        }

        const data = await response.json();
        
        // Format the data to match our component expectations
        return {
            city: data.location.name,
            country: cityInfo.country,
            temperature: Math.round(data.current.temp_c),
            condition: data.current.condition.text,
            icon: `https:${data.current.condition.icon}`,
            humidity: data.current.humidity,
            wind: data.current.wind_kph,
            feelsLike: Math.round(data.current.feelslike_c),
            pressure: data.current.pressure_mb,
            precipitation: data.current.precip_mm,
            uv: data.current.uv,
            windDirection: data.current.wind_dir,
            // Add forecast data
            forecast: data.forecast.forecastday.map(day => ({
                date: day.date,
                maxTemp: Math.round(day.day.maxtemp_c),
                minTemp: Math.round(day.day.mintemp_c),
                condition: day.day.condition.text,
                icon: `https:${day.day.condition.icon}`,
                chanceOfRain: day.day.daily_chance_of_rain
            })),
            // Include the original data for any other needs
            location: data.location,
            current: data.current
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