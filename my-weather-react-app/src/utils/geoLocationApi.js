/**
 * Utility functions for IP-based geolocation
 */

/**
 * Fetches the user's location based on their IP address
 * Using the free ipapi.co service
 * @returns {Promise} - Promise that resolves to location data
 */
export const fetchUserLocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
};

/**
 * Maps country codes to European capital cities
 * @param {string} countryCode - ISO country code (e.g., 'GB', 'FR')
 * @returns {string} - Capital city name or null if not found
 */
export const getCapitalByCountryCode = (countryCode) => {
  const countryCapitals = {
    'AL': 'Tirana',
    'AT': 'Vienna',
    'BE': 'Brussels',
    'BG': 'Sofia',
    'HR': 'Zagreb',
    'CY': 'Nicosia',
    'CZ': 'Prague',
    'DK': 'Copenhagen',
    'EE': 'Tallinn',
    'FI': 'Helsinki',
    'FR': 'Paris',
    'DE': 'Berlin',
    'GR': 'Athens',
    'HU': 'Budapest',
    'IE': 'Dublin',
    'IT': 'Rome',
    'LV': 'Riga',
    'LT': 'Vilnius',
    'LU': 'Luxembourg',
    'MT': 'Valletta',
    'NL': 'Amsterdam',
    'PL': 'Warsaw',
    'PT': 'Lisbon',
    'RO': 'Bucharest',
    'SK': 'Bratislava',
    'SI': 'Ljubljana',
    'ES': 'Madrid',
    'SE': 'Stockholm',
    'GB': 'London',
    'NO': 'Oslo',
    'CH': 'Bern',
    'IS': 'Reykjavik',
    'UA': 'Kyiv',
    'RS': 'Belgrade',
    'ME': 'Podgorica',
    'MK': 'Skopje',
    'BA': 'Sarajevo',
    'MD': 'Chisinau'
  };
  
  return countryCapitals[countryCode] || 'London'; // Default to London if country not found
}; 