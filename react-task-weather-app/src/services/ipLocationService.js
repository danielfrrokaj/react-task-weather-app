import { CAPITAL_CITIES } from './weatherService';

// Get unique countries from CAPITAL_CITIES
const availableCountries = [...new Set(CAPITAL_CITIES.map(city => city.country))];

/**
 * Detects the user's country based on their IP address
 * @returns {Promise<{country: string, city: string|null}>} The detected country and city (if available)
 */
export const detectUserCountry = async () => {
    try {
        // Using ipapi.co for IP geolocation
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            throw new Error('Failed to fetch location data');
        }
        
        const data = await response.json();
        const detectedCountry = data.country_name;
        
        // Find a matching country in our available countries
        const matchedCountry = availableCountries.find(country => 
            country === detectedCountry || 
            country.toLowerCase().includes(detectedCountry.toLowerCase()) ||
            detectedCountry.toLowerCase().includes(country.toLowerCase())
        );
        
        // If we found a match, try to find a city in that country
        if (matchedCountry) {
            // Try to find the capital or a major city in the detected country
            const citiesInCountry = CAPITAL_CITIES.filter(city => city.country === matchedCountry);
            
            // If we have the user's city, try to match it with our cities
            let matchedCity = null;
            if (data.city) {
                matchedCity = citiesInCountry.find(city => 
                    city.city === data.city || 
                    city.city.toLowerCase().includes(data.city.toLowerCase()) ||
                    data.city.toLowerCase().includes(city.city.toLowerCase())
                );
            }
            
            return {
                country: matchedCountry,
                city: matchedCity ? matchedCity.city : (citiesInCountry.length > 0 ? citiesInCountry[0].city : null)
            };
        }
        
        // Default to Albania if no match found
        return {
            country: 'Albania',
            city: 'Tirana'
        };
    } catch (error) {
        console.error('Error detecting user country:', error);
        // Default to Albania if there's an error
        return {
            country: 'Albania',
            city: 'Tirana'
        };
    }
}; 