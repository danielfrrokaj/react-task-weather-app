import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import WeatherCard from './WeatherCard';
import { getWeatherForCity, CAPITAL_CITIES } from '../services/weatherService';

const EmbeddedWeatherCard = () => {
    const [searchParams] = useSearchParams();
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const city = searchParams.get('city') || 'London';
    const width = searchParams.get('width') || '100%';
    const height = searchParams.get('height') || '600px';

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setIsLoading(true);
                const cityInfo = CAPITAL_CITIES.find(c => c.city.toLowerCase() === city.toLowerCase()) || 
                               CAPITAL_CITIES.find(c => c.city === 'London');
                
                if (cityInfo) {
                    const data = await getWeatherForCity(cityInfo);
                    setWeatherData(data);
                }
            } catch (error) {
                console.error('Error fetching weather:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    const containerStyle = {
        width,
        height,
        overflow: 'hidden',
        border: 'none',
        borderRadius: '12px',
        background: 'transparent'
    };

    if (isLoading) {
        return (
            <div style={containerStyle} className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div style={containerStyle} className="bg-gradient-to-br from-blue-900 via-slate-900 to-black">
            {weatherData && (
                <WeatherCard 
                    selectedCountry={weatherData.country}
                    initialCity={weatherData.city}
                    searchResults={weatherData}
                    embedded={true}
                />
            )}
        </div>
    );
};

export default EmbeddedWeatherCard; 