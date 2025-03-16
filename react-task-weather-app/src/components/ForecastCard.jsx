import { useTranslation } from '../context/TranslationContext';
import { useState, useEffect } from 'react';

const ForecastCard = ({ forecast, isSmall = false }) => {
    const { t, language } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        // Delay the animation slightly for a staggered effect
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);
    
    if (!forecast) return null;
    
    // Format the date to display day of week
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        
        // Use Albanian locale for dates when language is Albanian
        if (language === 'al') {
            const albanianDays = {
                'Mon': 'Hën',
                'Tue': 'Mar',
                'Wed': 'Mër',
                'Thu': 'Enj',
                'Fri': 'Pre',
                'Sat': 'Sht',
                'Sun': 'Die'
            };
            
            const englishDay = date.toLocaleDateString('en-US', { weekday: 'short' });
            return albanianDays[englishDay] || englishDay;
        }
        
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };
    
    // Translate weather condition
    const translateCondition = (condition) => {
        if (language !== 'al') return condition.split(' ')[0];
        
        // Albanian translations for common weather conditions
        const weatherTranslations = {
            'Clear': 'Kthjellët',
            'Sunny': 'Diell',
            'Partly': 'Pjesërisht',
            'Cloudy': 'Vranët',
            'Overcast': 'Vranësira',
            'Mist': 'Mjegull',
            'Fog': 'Mjegull',
            'Rain': 'Shi',
            'Drizzle': 'Vesë',
            'Showers': 'Rrebesh',
            'Snow': 'Borë',
            'Sleet': 'Borë me shi',
            'Thunderstorm': 'Stuhi',
            'Thunder': 'Bubullimë',
            'Storm': 'Stuhi'
        };
        
        // Try to match the first word of the condition
        const firstWord = condition.split(' ')[0];
        return weatherTranslations[firstWord] || condition.split(' ')[0];
    };
    
    // Get weather-based animation
    const getWeatherAnimation = (condition) => {
        const lowerCondition = condition.toLowerCase();
        
        if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle') || lowerCondition.includes('shower')) {
            return 'animate-pulse-slow';
        } else if (lowerCondition.includes('snow')) {
            return 'animate-pulse-slow';
        } else if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
            return 'animate-pulse-slow';
        }
        
        return '';
    };
    
    return (
        <div className={`
            bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-lg
            ${isSmall ? 'p-2' : 'p-3'}
            transition-all duration-300 hover:scale-105 hover:bg-white/15
            ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-4'}
            transition-all duration-500 ease-out
        `}>
            <div className="text-center">
                <p className={`text-white font-semibold ${isSmall ? 'text-xs' : 'text-sm'}`}>
                    {formatDate(forecast.date)}
                </p>
                <div className="flex flex-col items-center">
                    <img 
                        src={forecast.icon} 
                        alt={forecast.condition}
                        className={`${isSmall ? 'w-8 h-8' : 'w-10 h-10'} ${getWeatherAnimation(forecast.condition)}`}
                    />
                    <p className={`text-white ${isSmall ? 'text-xs' : 'text-sm'}`}>
                        {translateCondition(forecast.condition)}
                    </p>
                </div>
                <div className="flex justify-center gap-1 mt-1">
                    <span className={`text-white font-bold ${isSmall ? 'text-xs' : 'text-sm'}`}>
                        {forecast.maxTemp}°
                    </span>
                    <span className={`text-white/70 ${isSmall ? 'text-xs' : 'text-sm'}`}>
                        {forecast.minTemp}°
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ForecastCard; 