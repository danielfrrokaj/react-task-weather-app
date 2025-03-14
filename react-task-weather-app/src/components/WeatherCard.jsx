import { useState, useEffect, useRef } from 'react';
import { CAPITAL_CITIES, getWeatherForCity } from '../services/weatherService';
import { cityBackgrounds, defaultBackground } from '../config/cityBackgrounds';
import WeatherDetails from './WeatherDetails';
import AIRecommendButton from './AIRecommendButton';
import AIRecommendations from './AIRecommendations';

const WeatherCard = ({ selectedCountry, initialCity }) => {
    const [currentCityIndex, setCurrentCityIndex] = useState(0);
    const [weatherData, setWeatherData] = useState(null);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [showSwipeHint, setShowSwipeHint] = useState(false);

    // Filter cities based on selected country
    const countryCities = CAPITAL_CITIES.filter(city => city.country === selectedCountry);

    // Reset current city index when country changes or initialCity is provided
    useEffect(() => {
        if (initialCity) {
            const cityIndex = countryCities.findIndex(city => city.city === initialCity);
            if (cityIndex !== -1) {
                setCurrentCityIndex(cityIndex);
            } else {
                setCurrentCityIndex(0);
            }
        } else {
            setCurrentCityIndex(0);
        }
    }, [selectedCountry, initialCity]);

    // Fetch weather data for the current city
    useEffect(() => {
        const fetchWeatherData = async () => {
            if (countryCities.length > 0) {
                try {
                    const cityInfo = countryCities[currentCityIndex];
                    const data = await getWeatherForCity(cityInfo);
                    setWeatherData(data);
                } catch (error) {
                    console.error('Error fetching weather:', error);
                }
            }
        };

        fetchWeatherData();
    }, [currentCityIndex, selectedCountry, countryCities]);

    useEffect(() => {
        // Check if user has seen the hint before
        const hasSeenHint = localStorage.getItem('hasSeenSwipeHint');
        if (!hasSeenHint) {
            setShowSwipeHint(true);
            // Set timeout to auto-hide hint after 3 seconds
            const timer = setTimeout(() => {
                setShowSwipeHint(false);
                localStorage.setItem('hasSeenSwipeHint', 'true');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleNext = () => {
        setCurrentCityIndex(prevIndex => 
            prevIndex === countryCities.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentCityIndex(prevIndex => 
            prevIndex === 0 ? countryCities.length - 1 : prevIndex - 1
        );
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const difference = touchStart - touchEnd;
        if (Math.abs(difference) > 75) {
            if (difference > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }
        
        // Reset touch values
        setTouchStart(0);
        setTouchEnd(0);
    };

    if (!weatherData || countryCities.length === 0) return null;

    const currentCity = weatherData.location.name;
    const backgroundImage = cityBackgrounds[currentCity] || defaultBackground;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-8">
            <div className="relative w-full max-w-[800px] mx-auto">
                <div 
                    className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Background Image with Gradient */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
                        style={{
                            backgroundImage: `url('${backgroundImage}')`
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/80" />
                    </div>

                    {/* Navigation Buttons - Hidden on Mobile */}
                    {countryCities.length > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                                aria-label="Previous city"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={handleNext}
                                className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                                aria-label="Next city"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Weather Information */}
                    <div className="absolute bottom-0 w-full p-6 text-white">
                        <h2 className="text-4xl font-bold mb-2">
                            {weatherData.location.name}
                        </h2>
                        <p className="text-lg text-white/80 mb-4">
                            {weatherData.country}
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="text-5xl font-semibold">
                                {Math.round(weatherData.current.temp_c)}°C
                            </span>
                            <img 
                                src={`https:${weatherData.current.condition.icon}`}
                                alt={weatherData.current.condition.text}
                                className="w-16 h-16"
                            />
                            <span className="text-xl">
                                {weatherData.current.condition.text}
                            </span>
                        </div>
                    </div>
                </div>
                {/* AI Recommendations Button */}
                <div className="mt-6 mb-8">
                    <AIRecommendButton onClick={() => setShowRecommendations(!showRecommendations)} />
                </div>
            </div>
            <AIRecommendations weatherData={weatherData} isVisible={showRecommendations} />
            <WeatherDetails weatherData={weatherData} />
            
            {/* Swipe Hint Overlay */}
            {showSwipeHint && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-xl" />
                    <div className="absolute inset-0 flex items-center justify-between px-8">
                        <div className="flex items-center gap-2 text-white/90 animate-pulse">
                            <svg 
                                className="w-6 h-6" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M15 19l-7-7 7-7" 
                                />
                            </svg>
                            <span className="text-sm font-medium">Swipe Left</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90 animate-pulse">
                            <span className="text-sm font-medium">Swipe Right</span>
                            <svg 
                                className="w-6 h-6" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M9 5l7 7-7 7" 
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherCard; 