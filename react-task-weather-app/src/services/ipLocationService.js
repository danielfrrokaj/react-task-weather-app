import { CAPITAL_CITIES } from './weatherService';

// Get unique countries from CAPITAL_CITIES
const availableCountries = [...new Set(CAPITAL_CITIES.map(city => city.country))];

/**
 * Detects the user's country based on their IP address
 * @returns {Promise<{country: string, city: string|null}>} The detected country and city (if available)
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
        console.log('Detected country code:', data.country);
        console.log('Detected country name:', detectedCountry);
        
        // Handle country code (AL for Albania)
        if (data.country === 'AL') {
            console.log('Albanian IP detected!');
            return {
                country: 'Albania',
                city: 'Tirana'
            };
        }
        
        // Handle country code (IT for Italy)
        if (data.country === 'IT') {
            console.log('Italian IP detected!');
            return {
                country: 'Italy',
                city: 'Rome'
            };
        }
        
        // Handle Netherlands specifically
        if (data.country === 'NL') {
            console.log('Netherlands IP detected!');
            return {
                country: 'Netherlands',
                city: 'Amsterdam'
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
                city: matchedCity ? matchedCity.city : (citiesInCountry.length > 0 ? citiesInCountry[0].city : null)
            };
        }
        
        // Default to United Kingdom if no match found (instead of Albania)
        console.log('No match found, defaulting to United Kingdom');
        return {
            country: 'United Kingdom',
            city: 'London'
        };
    } catch (error) {
        console.error('Error detecting user country:', error);
        // Default to United Kingdom if there's an error (instead of Albania)
        return {
            country: 'United Kingdom',
            city: 'London'
        };
    }
}; 