import { useState } from 'react';
import { CAPITAL_CITIES } from '../services/weatherService';

// Haversine formula to calculate distance between two points on Earth
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

const ALBANIAN_CITIES_COORDS = {
    'Tirana': { lat: 41.3275, lon: 19.8187 },
    'Durrës': { lat: 41.3233, lon: 19.4562 },
    'Vlorë': { lat: 40.4667, lon: 19.4833 },
    'Elbasan': { lat: 41.1125, lon: 20.0822 },
    'Shkodër': { lat: 42.0683, lon: 19.5126 },
    'Fier': { lat: 40.7239, lon: 19.5567 },
    'Korçë': { lat: 40.6186, lon: 20.7808 },
    'Berat': { lat: 40.7058, lon: 19.9522 },
    'Lushnjë': { lat: 40.9419, lon: 19.7050 },
    'Pogradec': { lat: 40.9025, lon: 20.6525 },
    'Kavajë': { lat: 41.1856, lon: 19.5569 },
    'Gjirokastër': { lat: 40.0758, lon: 20.1389 },
    'Lezhë': { lat: 41.7836, lon: 19.6436 },
    'Kuçovë': { lat: 40.8003, lon: 19.9167 }
};

const LocationButton = ({ onLocationFound }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const findNearestAlbanianCity = (userLat, userLon) => {
        let nearestCity = null;
        let shortestDistance = Infinity;

        Object.entries(ALBANIAN_CITIES_COORDS).forEach(([city, coords]) => {
            const distance = calculateDistance(userLat, userLon, coords.lat, coords.lon);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestCity = city;
            }
        });

        return nearestCity;
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
                    const { latitude, longitude } = position.coords;
                    const nearestCity = findNearestAlbanianCity(latitude, longitude);
                    
                    if (nearestCity) {
                        // If within reasonable distance (300km) of an Albanian city
                        const distance = calculateDistance(
                            latitude, 
                            longitude, 
                            ALBANIAN_CITIES_COORDS[nearestCity].lat,
                            ALBANIAN_CITIES_COORDS[nearestCity].lon
                        );
                        
                        if (distance <= 300) {
                            onLocationFound('Albania');
                            // You could also pass the specific city if you want to show the nearest city
                        } else {
                            setError('You seem to be too far from Albania');
                        }
                    } else {
                        setError('Could not find a nearby Albanian city');
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
        <div className="fixed top-4 right-4 md:top-8 md:right-8 z-50">
            <div className="relative">
                <button
                    onClick={handleLocationClick}
                    disabled={isLoading}
                    className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    title="Use my location"
                >
                    {isLoading ? (
                        <svg className="animate-spin h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg 
                            className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                            />
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                            />
                        </svg>
                    )}
                </button>
                {error && (
                    <div className="absolute top-full right-0 mt-2 w-48 p-2 bg-red-500/90 backdrop-blur-md text-white text-sm rounded-lg shadow-lg">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocationButton; 