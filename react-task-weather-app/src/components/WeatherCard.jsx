import { useState, useEffect, useRef } from 'react';
import { CAPITAL_CITIES, getWeatherForCity } from '../services/weatherService';
import { cityBackgrounds, defaultBackground } from '../config/cityBackgrounds';
import WeatherDetails from './WeatherDetails';
import AIRecommendButton from './AIRecommendButton';
import AIRecommendations from './AIRecommendations';
import ForecastCard from './ForecastCard';
import { useTranslation } from '../context/TranslationContext';

const WeatherCard = ({ selectedCountry, initialCity, searchResults }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);
    const weatherCache = useRef({});
    const [currentCityInfo, setCurrentCityInfo] = useState(null);
    const { t } = useTranslation();

    // Filter cities based on selected country
    const countryCities = CAPITAL_CITIES.filter(city => city.country === selectedCountry);

    // Use search results if available
    useEffect(() => {
        if (searchResults) {
            setWeatherData(searchResults);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 2000);
        }
    }, [searchResults]);

    // Set current city info
    useEffect(() => {
        if (countryCities.length === 0 || searchResults) return;

        let cityInfo;
        if (initialCity) {
            const foundCity = countryCities.find(city => city.city === initialCity);
            cityInfo = foundCity || countryCities[0];
        } else {
            cityInfo = countryCities[0];
        }

        setCurrentCityInfo(cityInfo);
    }, [selectedCountry, initialCity, countryCities, searchResults]);

    // Fetch weather data for the current city
    useEffect(() => {
        if (!currentCityInfo || searchResults) return;

        const fetchWeatherData = async () => {
            const cacheKey = `${currentCityInfo.country}-${currentCityInfo.city}`;

            if (weatherCache.current[cacheKey]) {
                setWeatherData(weatherCache.current[cacheKey]);
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 2000);
                return;
            }

            try {
                setIsLoading(true);
                const data = await getWeatherForCity(currentCityInfo);
                weatherCache.current[cacheKey] = data;
                setWeatherData(data);
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 2000);
            } catch (error) {
                console.error('Error fetching weather:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeatherData();
    }, [currentCityInfo]);

    // Clear cache when country changes
    useEffect(() => {
        weatherCache.current = {};
    }, [selectedCountry]);

    // Initial animation trigger
    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!weatherData || countryCities.length === 0) return null;

    // Get the current city name from the weather data
    const currentCity = weatherData.city || (weatherData.location && weatherData.location.name);
    const backgroundImage = cityBackgrounds[currentCity] || defaultBackground;

    // Get forecast data for tomorrow and day after tomorrow
    const tomorrowForecast = weatherData.forecast && weatherData.forecast[1];
    const afterTomorrowForecast = weatherData.forecast && weatherData.forecast[2];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-8 animate-fadeIn">
            <div className="relative w-full max-w-[800px] mx-auto">
                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl animate-scaleIn">
                    {/* Background Image with Gradient */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
                        style={{
                            backgroundImage: `url('${backgroundImage}')`
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/80" />
                    </div>

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                        </div>
                    )}

                    {/* Forecast Cards - Mobile (Top Right) */}
                    <div className="absolute top-2 right-2 md:hidden flex gap-2">
                        {tomorrowForecast && (
                            <div className={`${isAnimating ? 'animate-slideInRight animation-delay-300' : ''}`}>
                                <ForecastCard forecast={tomorrowForecast} isSmall={true} />
                            </div>
                        )}
                        {afterTomorrowForecast && (
                            <div className={`${isAnimating ? 'animate-slideInRight animation-delay-500' : ''}`}>
                                <ForecastCard forecast={afterTomorrowForecast} isSmall={true} />
                            </div>
                        )}
                    </div>

                    {/* Weather Information */}
                    <div className="absolute bottom-0 w-full p-6 text-white">
                        <div className="flex justify-between items-end">
                            <div>
                                <h2 className={`text-4xl font-bold mb-2 ${isAnimating ? 'animate-slideInLeft' : ''}`}>
                                    {currentCity}
                                </h2>
                                <p className={`text-lg text-white/80 mb-4 ${isAnimating ? 'animate-slideInLeft animation-delay-200' : ''}`}>
                                    {t(`countries.${weatherData.country}`)}
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className={`text-5xl font-semibold ${isAnimating ? 'animate-slideInUp animation-delay-300' : ''}`}>
                                        {weatherData.temperature || (weatherData.current && Math.round(weatherData.current.temp_c))}°C
                                    </span>
                                    <img
                                        src={weatherData.icon || (weatherData.current && `https:${weatherData.current.condition.icon}`)}
                                        alt={weatherData.condition || (weatherData.current && weatherData.current.condition.text)}
                                        className={`w-16 h-16 ${isAnimating ? 'animate-scaleIn animation-delay-400 animate-pulse-slow' : 'animate-pulse-slow'}`}
                                    />
                                    <span className={`text-xl ${isAnimating ? 'animate-slideInRight animation-delay-500' : ''}`}>
                                        {weatherData.condition || (weatherData.current && weatherData.current.condition.text)}
                                    </span>
                                </div>
                            </div>

                            {/* Forecast Cards - Desktop (Bottom Right) */}
                            <div className="hidden md:flex gap-2">
                                {tomorrowForecast && (
                                    <div className={`${isAnimating ? 'animate-slideInUp animation-delay-400' : ''}`}>
                                        <ForecastCard forecast={tomorrowForecast} />
                                    </div>
                                )}
                                {afterTomorrowForecast && (
                                    <div className={`${isAnimating ? 'animate-slideInUp animation-delay-600' : ''}`}>
                                        <ForecastCard forecast={afterTomorrowForecast} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* AI Recommendations Button */}
                <div className={`mt-6 mb-8 ${isAnimating ? 'animate-slideInUp animation-delay-700' : ''}`}>
                    <AIRecommendButton onClick={() => setShowRecommendations(!showRecommendations)} />
                </div>
            </div>
            <AIRecommendations weatherData={weatherData} isVisible={showRecommendations} />
            <div className={`w-full ${isAnimating ? 'animate-fadeIn animation-delay-1000' : ''}`}>
                <WeatherDetails weatherData={weatherData} />
            </div>
        </div>
    );
};

export default WeatherCard;
