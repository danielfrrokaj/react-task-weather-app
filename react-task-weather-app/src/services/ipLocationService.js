import { CAPITAL_CITIES } from './weatherService';

// Get unique countries from CAPITAL_CITIES
const availableCountries = [...new Set(CAPITAL_CITIES.map(city => city.country))];

// Country to language mapping
const COUNTRY_LANGUAGE_MAP = {
    'AL': 'al',
    'IT': 'it',
    // All other countries will default to English
};

/**
 * Detects the user's country based on their IP address
 * @returns {Promise<{country: string, city: string|null, language: string}>} The detected country, city, and language
 */
export const detectUserCountry = async () => {
    try {
        // Try multiple IP geolocation services for redundancy
        console.log('Fetching IP location data...');
        
        // First try ipapi.co
        let response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            console.log('ipapi.co failed, trying ipinfo.io...');
            // Fallback to ipinfo.io
            response = await fetch('https://ipinfo.io/json');
        }
        
        if (!response.ok) {
            console.log('All IP services failed, defaulting to United Kingdom');
            throw new Error('Failed to fetch location data');
        }
        
        const data = await response.json();
        console.log('IP location data:', data);
        
        // Different APIs return country in different formats
        const detectedCountry = data.country_name || data.country || '';
        const countryCode = data.country || '';
        console.log('Detected country code:', countryCode);
        console.log('Detected country name:', detectedCountry);
        
        // Determine language based on country code
        const language = COUNTRY_LANGUAGE_MAP[countryCode] || 'en';
        console.log('Detected language:', language);
        
        // Handle country code (AL for Albania)
        if (countryCode === 'AL') {
            console.log('Albanian IP detected!');
            return {
                country: 'Albania',
                city: 'Tirana',
                language: 'al'
            };
        }
        
        // Handle country code (IT for Italy)
        if (countryCode === 'IT') {
            console.log('Italian IP detected!');
            return {
                country: 'Italy',
                city: 'Rome',
                language: 'it'
            };
        }
        
        // Handle Netherlands specifically
        if (countryCode === 'NL') {
            console.log('Netherlands IP detected!');
            return {
                country: 'Netherlands',
                city: 'Amsterdam',
                language: 'en'
            };
        }
        
        console.log('Available countries:', availableCountries);
        
        // Try exact match first
        let matchedCountry = availableCountries.find(country => 
            country === detectedCountry
        );
        
        // If no exact match, try partial match
        if (!matchedCountry) {
            matchedCountry = availableCountries.find(country => 
                country.toLowerCase().includes(detectedCountry.toLowerCase()) ||
                detectedCountry.toLowerCase().includes(country.toLowerCase())
            );
        }
        
        console.log('Matched country:', matchedCountry);
        
        // If we found a match, try to find a city in that country
        if (matchedCountry) {
            // Try to find the capital or a major city in the detected country
            const citiesInCountry = CAPITAL_CITIES.filter(city => city.country === matchedCountry);
            console.log('Cities in country:', citiesInCountry);
            
            // If we have the user's city, try to match it with our cities
            let matchedCity = null;
            if (data.city) {
                console.log('Detected city:', data.city);
                matchedCity = citiesInCountry.find(city => 
                    city.city === data.city || 
                    city.city.toLowerCase().includes(data.city.toLowerCase()) ||
                    data.city.toLowerCase().includes(city.city.toLowerCase())
                );
            }
            
            console.log('Matched city:', matchedCity ? matchedCity.city : null);
            
            return {
                country: matchedCountry,
                city: matchedCity ? matchedCity.city : (citiesInCountry.length > 0 ? citiesInCountry[0].city : null),
                language: language
            };
        }
        
        // Default to United Kingdom if no match found
        console.log('No match found, defaulting to United Kingdom');
        return {
            country: 'United Kingdom',
            city: 'London',
            language: 'en'
        };
    } catch (error) {
        console.error('Error detecting user country:', error);
        // Default to United Kingdom if there's an error
        return {
            country: 'United Kingdom',
            city: 'London',
            language: 'en'
        };
    }
}; 