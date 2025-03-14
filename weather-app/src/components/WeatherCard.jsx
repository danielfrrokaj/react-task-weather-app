import { useState, useEffect } from 'react';
import { ALBANIAN_CITIES, getWeatherForCity } from '../services/weatherService';
import { cityBackgrounds, defaultBackground } from '../config/cityBackgrounds';

const WeatherCard = () => {
    const [currentCityIndex, setCurrentCityIndex] = useState(0);
    const [weatherData, setWeatherData] = useState(null);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const fetchWeatherData = async (city) => {
        try {
            const data = await getWeatherForCity(city);
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    };

    useEffect(() => {
        fetchWeatherData(ALBANIAN_CITIES[currentCityIndex]);
    }, [currentCityIndex]);

    const handleNext = () => {
        setCurrentCityIndex((prev) => 
            prev === ALBANIAN_CITIES.length - 1 ? 0 : prev + 1
        );
    };

    const handlePrev = () => {
        setCurrentCityIndex((prev) => 
            prev === 0 ? ALBANIAN_CITIES.length - 1 : prev - 1
        );
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            handleNext();
        }
        if (touchStart - touchEnd < -75) {
            handlePrev();
        }
    };

    if (!weatherData) return null;

    const currentCity = weatherData.location.name;
    const backgroundImage = cityBackgrounds[currentCity] || defaultBackground;

    return (
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
                <button
                    onClick={handlePrev}
                    className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={handleNext}
                    className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Weather Information */}
                <div className="absolute bottom-0 w-full p-6 text-white">
                    <h2 className="text-4xl font-bold mb-2">
                        {weatherData.location.name}
                    </h2>
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
        </div>
    );
};

export default WeatherCard; 