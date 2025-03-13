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
 * European capital cities list
 */
export const EUROPEAN_CAPITALS = [
  'Tirana',      // Albania
  'Amsterdam',   // Netherlands
  'Andorra la Vella', // Andorra
  'Athens',      // Greece
  'Belgrade',    // Serbia
  'Berlin',      // Germany
  'Bern',        // Switzerland
  'Bratislava',  // Slovakia
  'Brussels',    // Belgium
  'Bucharest',   // Romania
  'Budapest',    // Hungary
  'Chisinau',    // Moldova
  'Copenhagen',  // Denmark
  'Dublin',      // Ireland
  'Helsinki',    // Finland
  'Kyiv',        // Ukraine
  'Lisbon',      // Portugal
  'Ljubljana',   // Slovenia
  'London',      // United Kingdom
  'Luxembourg',  // Luxembourg
  'Madrid',      // Spain
  'Minsk',       // Belarus
  'Monaco',      // Monaco
  'Moscow',      // Russia
  'Oslo',        // Norway
  'Paris',       // France
  'Podgorica',   // Montenegro
  'Prague',      // Czech Republic
  'Reykjavik',   // Iceland
  'Riga',        // Latvia
  'Rome',        // Italy
  'San Marino',  // San Marino
  'Sarajevo',    // Bosnia and Herzegovina
  'Skopje',      // North Macedonia
  'Sofia',       // Bulgaria
  'Stockholm',   // Sweden
  'Tallinn',     // Estonia
  'Valletta',    // Malta
  'Vatican City', // Vatican City
  'Vienna',      // Austria
  'Vilnius',     // Lithuania
  'Warsaw',      // Poland
  'Zagreb'       // Croatia
];

// For backward compatibility
export const ALBANIAN_CITIES = EUROPEAN_CAPITALS; 