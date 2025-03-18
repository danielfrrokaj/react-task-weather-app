import { useTranslation } from '../context/TranslationContext';
import { useState, useEffect } from 'react';

const WeatherDetails = ({ weatherData }) => {
    const { t, language } = useTranslation();
    const [isAnimating, setIsAnimating] = useState(false);
    
    useEffect(() => {
        // Trigger animation when component mounts or weatherData changes
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 2000);
        
        return () => clearTimeout(timer);
    }, [weatherData]);
    
    if (!weatherData) return null;

    // Handle both new and old data formats
    const getDetails = () => {
        // Check if we're using the new format (with direct properties) or old format (with nested properties)
        const isNewFormat = 'temperature' in weatherData;
        
        return [
            {
                icon: 'fa-location-dot',
                label: t('weather.country'),
                value: t(`countries.${weatherData.country}`),
                color: 'text-emerald-500'
            },
        {
            icon: 'fa-temperature-half',
                label: t('weather.feelsLike'),
                value: isNewFormat 
                    ? `${weatherData.feelsLike}°C`
                    : `${Math.round(weatherData.current.feelslike_c)}°C`,
            color: 'text-red-500'
        },
        {
            icon: 'fa-droplet',
                label: t('weather.humidity'),
                value: isNewFormat
                    ? `${weatherData.humidity}%`
                    : `${weatherData.current.humidity}%`,
            color: 'text-blue-500'
        },
        {
            icon: 'fa-wind',
                label: t('weather.wind'),
                value: isNewFormat
                    ? `${weatherData.wind} km/h`
                    : `${weatherData.current.wind_kph} km/h`,
            color: 'text-teal-500'
        },
        {
            icon: 'fa-compass',
                label: t('weather.windDirection'),
                value: isNewFormat
                    ? weatherData.windDirection
                    : weatherData.current.wind_dir,
            color: 'text-purple-500'
        },
        {
            icon: 'fa-gauge-high',
                label: t('weather.pressure'),
                value: isNewFormat
                    ? `${weatherData.pressure} hPa`
                    : `${weatherData.current.pressure_mb} mb`,
            color: 'text-amber-500'
        },
        {
            icon: 'fa-cloud-rain',
                label: t('weather.precipitation'),
                value: isNewFormat
                    ? `${weatherData.precipitation} mm`
                    : `${weatherData.current.precip_mm} mm`,
            color: 'text-indigo-500'
            },
            {
                icon: 'fa-sun',
                label: t('weather.uv'),
                value: isNewFormat
                    ? weatherData.uv
                    : weatherData.current.uv,
                color: 'text-yellow-500'
            }
        ];
    };

    // Function to get clothing recommendations based on temperature
    const getClothingRecommendations = () => {
        const temperature = weatherData.temperature || 
            (weatherData.current && Math.round(weatherData.current.temp_c));
            
        if (temperature >= 25) {
            return t('Hot Weather Tips');
        } else if (temperature >= 15) {
            return t('Mild Weather Tips');
        } else if (temperature >= 5) {
            return t('Cool Weather Tips');
        } else {
            return t('Cold Weather Tips');
        }
    };

    // Function to get activity recommendations based on weather condition
    const getActivityRecommendations = () => {
        const condition = weatherData.condition || 
            (weatherData.current && weatherData.current.condition.text);
            
        const lowerCondition = condition.toLowerCase();
        
        if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle') || lowerCondition.includes('shower')) {
            return t('Rainy Weather Activities');
        } else if (lowerCondition.includes('snow') || lowerCondition.includes('blizzard') || lowerCondition.includes('sleet')) {
            return t('Snowy Weather Activities');
        } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
            return t('Cloudy Weather Activities');
        } else if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
            return t('Sunny Weather Activities');
        } else {
            return t('General Weather Activities');
        }
    };

    const details = getDetails();

    // Get city name from weather data
    const cityName = weatherData.city || (weatherData.location && weatherData.location.name);
    
    // Get temperature and humidity for recommendations
    const temperature = weatherData.temperature || 
        (weatherData.current && Math.round(weatherData.current.temp_c));
    const humidity = weatherData.humidity || 
        (weatherData.current && weatherData.current.humidity);
    const condition = weatherData.condition || 
        (weatherData.current && weatherData.current.condition.text);

    return (
        <div className="w-full max-w-[800px] mx-auto mt-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl transition-all duration-500 animate-fadeIn">
                <h3 className={`text-2xl font-semibold text-white mb-6 ${isAnimating ? 'animate-slideInLeft' : ''}`}>
                    {t('weather.weatherDetailsFor')} {cityName}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {details.map((detail, index) => (
                        <div 
                            key={index}
                            className={`bg-white/5 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4 transition-all duration-300 hover:scale-105 hover:bg-white/10 ${
                                isAnimating ? `animate-slideInUp animation-delay-${index * 100}` : ''
                            }`}
                        >
                            <div className={`text-2xl ${detail.color}`}>
                                <i className={`fas ${detail.icon}`}></i>
                            </div>
                            <div>
                                <p className="text-white/60 text-sm">
                                    {detail.label}
                                </p>
                                <p className="text-white font-semibold">
                                    {detail.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={`bg-white/5 p-4 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                            isAnimating ? 'animate-slideInLeft animation-delay-500' : ''
                        }`}>
                            <h3 className="text-xl font-semibold text-white mb-3">{t('What to Wear')}</h3>
                            <p className="text-blue-200">{getClothingRecommendations()}</p>
                            <ul className="mt-3 space-y-2 text-white/80">
                                {temperature >= 25 && (
                                    <>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Light and breathable clothing')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Hat and sunglasses')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Sunscreen')}</li>
                                    </>
                                )}
                                {temperature >= 15 && temperature < 25 && (
                                    <>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Light layers')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Light jacket or sweater')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Comfortable shoes')}</li>
                                    </>
                                )}
                                {temperature >= 5 && temperature < 15 && (
                                    <>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Warm layers')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Light coat or jacket')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Scarf and hat')}</li>
                                    </>
                                )}
                                {temperature < 5 && (
                                    <>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Heavy winter coat')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Gloves, scarf, and hat')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Thermal layers')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Warm boots')}</li>
                                    </>
                                )}
                            </ul>
                        </div>
                        
                        <div className={`bg-white/5 p-4 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                            isAnimating ? 'animate-slideInRight animation-delay-500' : ''
                        }`}>
                            <h3 className="text-xl font-semibold text-white mb-3">{t('Recommended Activities')}</h3>
                            <p className="text-blue-200">{getActivityRecommendations()}</p>
                            <ul className="mt-3 space-y-2 text-white/80">
                                {condition.toLowerCase().includes('rain') && (
                                    <>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Visit museums or galleries')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Watch a movie')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Read a book at a café')}</li>
                                    </>
                                )}
                                {condition.toLowerCase().includes('snow') && (
                                    <>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Build a snowman')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Go sledding')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Enjoy hot chocolate')}</li>
                                    </>
                                )}
                                {(condition.toLowerCase().includes('sun') || condition.toLowerCase().includes('clear')) && (
                                    <>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Go for a hike')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Have a picnic')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Visit a park')}</li>
                                    </>
                                )}
                                {condition.toLowerCase().includes('cloud') && (
                                    <>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Go for a walk')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Visit local attractions')}</li>
                                        <li className="transition-all duration-300 hover:translate-x-1">• {t('Outdoor photography')}</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                    
                    <div className={`mt-6 bg-white/5 p-4 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                        isAnimating ? 'animate-slideInUp animation-delay-700' : ''
                    }`}>
                        <h3 className="text-xl font-semibold text-white mb-3">{t('Health Tips')}</h3>
                        <ul className="space-y-2 text-white/80">
                            {humidity < 30 && (
                                <li className="transition-all duration-300 hover:translate-x-1">• {t('Low humidity: Stay hydrated and moisturize skin')}</li>
                            )}
                            {humidity > 70 && (
                                <li className="transition-all duration-300 hover:translate-x-1">• {t('High humidity: Stay cool and avoid strenuous activities')}</li>
                            )}
                            {temperature > 30 && (
                                <li className="transition-all duration-300 hover:translate-x-1">• {t('Extreme heat: Avoid direct sun exposure between 11am-3pm')}</li>
                            )}
                            {temperature < 0 && (
                                <li className="transition-all duration-300 hover:translate-x-1">• {t('Freezing temperatures: Protect extremities and limit time outdoors')}</li>
                            )}
                            <li className="transition-all duration-300 hover:translate-x-1">• {t('Stay hydrated regardless of weather')}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherDetails; 