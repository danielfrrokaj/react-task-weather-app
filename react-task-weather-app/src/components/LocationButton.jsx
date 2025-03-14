import { useState } from 'react';
import { CAPITAL_CITIES } from '../services/weatherService';

const LocationButton = ({ onLocationFound }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const findNearestCity = (userLat, userLon) => {
        // Calculate distances to all cities and find the nearest one
        const distances = CAPITAL_CITIES.map(city => {
            // We'll need to fetch the coordinates for each city from the weather API
            // For now, we'll use the user's location to find their country
            return {
                city: city.city,
                country: city.country,
                // This will be replaced with actual distance calculation
                distance: 0
            };
        });

        // For now, just find a city in the user's country
        return distances[0];
    };

    const handleLocationClick = () => {
        setIsLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    // Use reverse geocoding to get the country
                    const response = await fetch(
                        `https://api.weatherapi.com/v1/search.json?key=252c1b0fcaee45c88bc212917251003&q=${position.coords.latitude},${position.coords.longitude}`
                    );
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch location data');
                    }

                    const data = await response.json();
                    if (data && data.length > 0) {
                        const userCountry = data[0].country;
                        // Find if we have this country in our list
                        const matchingCity = CAPITAL_CITIES.find(city => city.country === userCountry);
                        
                        if (matchingCity) {
                            onLocationFound(matchingCity.country);
                        } else {
                            setError('Your country is not in our list');
                        }
                    }
                } catch (error) {
                    setError('Failed to determine your location');
                } finally {
                    setIsLoading(false);
                }
            },
            (error) => {
                setError('Failed to get your location. Please allow location access.');
                setIsLoading(false);
            }
        );
    };

    return (
        <div className="w-full max-w-[800px] mx-auto mb-6 text-center">
            <button
                onClick={handleLocationClick}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Getting Location...
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Use My Location
                    </>
                )}
            </button>
            {error && (
                <p className="mt-2 text-red-400 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
};

export default LocationButton; 