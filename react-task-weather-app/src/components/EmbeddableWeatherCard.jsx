import { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import { getWeatherForCity } from '../services/weatherService';
import { TranslationProvider } from '../context/TranslationContext';

function EmbeddableWeatherCard() {
    const [weatherData, setWeatherData] = useState(null);
    const [customStyles, setCustomStyles] = useState({});

    useEffect(() => {
        // Parse URL parameters
        const params = new URLSearchParams(window.location.search);
        const city = params.get('city') || 'London';
        const width = params.get('width');
        const height = params.get('height');
        const fontColor = params.get('fontColor');
        const backgroundColor = params.get('backgroundColor') || 'transparent';
        const country = params.get('country') || 'United Kingdom';

        // Apply custom styles from URL parameters
        const styles = {
            width: width ? `${width}px` : '100%',
            height: height ? `${height}px` : 'auto',
            '--ai-text-color': fontColor || '#ffffff',
            backgroundColor: backgroundColor,
        };
        setCustomStyles(styles);

        // Fetch weather data for the specified city
        const fetchWeather = async () => {
            try {
                const data = await getWeatherForCity({ city, country });
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeather();
    }, []);

    return (
        <TranslationProvider>
            <div style={{
                ...customStyles,
                overflow: 'hidden'
            }}>
                <WeatherCard
                    selectedCountry={weatherData?.country || 'United Kingdom'}
                    initialCity={weatherData?.city || 'London'}
                    searchResults={weatherData}
                    isEmbedded={true}
                />
            </div>
        </TranslationProvider>
    );
}

export default EmbeddableWeatherCard; 