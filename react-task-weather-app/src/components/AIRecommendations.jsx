import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../context/TranslationContext';

const AIRecommendations = ({ weatherData, isVisible, isEmbedded = false }) => {
    const [recommendation, setRecommendation] = useState('');
    const [displayedText, setDisplayedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const lastWeatherState = useRef(null);
    const hasGeneratedRef = useRef(false);
    const recommendationsCache = useRef({});
    const { t } = useTranslation();

    const formatResponse = (text) => {
        // Split into lines and process each line
        return text.split('\n').map((line, index) => {
            // Bold any word in all caps (2 or more capital letters)
            line = line.replace(/\b[A-Z]{2,}\b/g, match => `<strong>${match}</strong>`);
            
            // Add line breaks for lines starting with dash
            if (line.trim().startsWith('-')) {
                line = `<br/>${line}`;
            }
            
            return line;
        }).join('\n');
    };

    // Generate a cache key based on weather data
    const getCacheKey = (weather) => {
        const isNewFormat = 'temperature' in weather;
        
        const temperature = isNewFormat 
            ? weather.temperature 
            : Math.round(weather.current.temp_c);
            
        const condition = isNewFormat 
            ? weather.condition 
            : weather.current.condition.text;
            
        const city = isNewFormat 
            ? weather.city 
            : weather.location.name;
            
        const country = weather.country;
        
        return `${city}-${country}-${temperature}-${condition}`;
    };

    const hasWeatherChanged = (currentWeather) => {
        if (!lastWeatherState.current) return true;
        
        // Check if we're using the new format (with direct properties) or old format (with nested properties)
        const isNewFormat = 'temperature' in currentWeather;
        const isLastNewFormat = 'temperature' in lastWeatherState.current;
        
        if (isNewFormat && isLastNewFormat) {
            return (
                lastWeatherState.current.temperature !== currentWeather.temperature ||
                lastWeatherState.current.condition !== currentWeather.condition ||
                lastWeatherState.current.humidity !== currentWeather.humidity ||
                lastWeatherState.current.city !== currentWeather.city ||
                lastWeatherState.current.country !== currentWeather.country
            );
        } else if (!isNewFormat && !isLastNewFormat) {
            return (
                lastWeatherState.current.current.temp_c !== currentWeather.current.temp_c ||
                lastWeatherState.current.current.condition.text !== currentWeather.current.condition.text ||
                lastWeatherState.current.current.humidity !== currentWeather.current.humidity ||
                lastWeatherState.current.location.name !== currentWeather.location.name ||
                lastWeatherState.current.location.country !== currentWeather.location.country
            );
        }
        
        // If formats are different, consider it changed
        return true;
    };

    const generateRecommendation = async (weatherInfo, forceRefresh = false) => {
        if (isLoading) return;
        
        // Check if we have a cached recommendation for this weather
        const cacheKey = getCacheKey(weatherInfo);
        if (!forceRefresh && recommendationsCache.current[cacheKey]) {
            console.log('Using cached AI recommendation');
            setRecommendation(recommendationsCache.current[cacheKey]);
            setDisplayedText('');
            setIsTyping(true);
            lastWeatherState.current = weatherInfo;
            return;
        }
        
        setIsLoading(true);
        if (forceRefresh) {
            setIsRefreshing(true);
        }
        hasGeneratedRef.current = true;
        
        try {
            // Check if we're using the new format (with direct properties) or old format (with nested properties)
            const isNewFormat = 'temperature' in weatherInfo;
            
            const temperature = isNewFormat 
                ? weatherInfo.temperature 
                : Math.round(weatherInfo.current.temp_c);
                
            const condition = isNewFormat 
                ? weatherInfo.condition 
                : weatherInfo.current.condition.text;
                
            const humidity = isNewFormat 
                ? weatherInfo.humidity 
                : weatherInfo.current.humidity;
                
            const city = isNewFormat 
                ? weatherInfo.city 
                : weatherInfo.location.name;
                
            const country = weatherInfo.country;
            
            const prompt = `Given the current weather conditions:
                - Temperature: ${temperature}°C
                - Condition: ${condition}
                - Humidity: ${humidity}%
                - Location: ${city}, ${country}
                
                Provide two specific recommendations: (keep it as short and concise), (if location is in Albania, answer in albanian)
                1. Clothing: List essential clothing items and accessories suitable for these conditions.
                2. Activities: Suggest 2-3 weather-appropriate outdoor activities.`;

            console.log('Fetching AI recommendation for:', city);
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 200,
                    top_p: 1,
                    stream: false,
                    n: 1
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get AI recommendation');
            }

            const data = await response.json();
            const formattedResponse = formatResponse(data.choices[0].message.content);
            
            // Cache the recommendation
            recommendationsCache.current[cacheKey] = formattedResponse;
            
            setRecommendation(formattedResponse);
            setDisplayedText('');
            setIsTyping(true);
            lastWeatherState.current = weatherInfo;
        } catch (error) {
            console.error('Error generating recommendation:', error);
            setRecommendation(t('ai.error'));
            setDisplayedText(t('ai.error'));
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    const handleReset = () => {
        setRecommendation('');
        setDisplayedText('');
        setIsTyping(false);
        lastWeatherState.current = null;
        hasGeneratedRef.current = false;
        
        // Generate a new recommendation after resetting, with forceRefresh=true
        if (weatherData) {
            setTimeout(() => {
                generateRecommendation(weatherData, true);
            }, 100); // Small delay to ensure state is updated
        }
    };

    useEffect(() => {
        if (isVisible) {
            const recommendations = recommendation || recommendation.split('\n').join('');
            let currentIndex = 0;
            setIsTyping(true);

            const typingInterval = setInterval(() => {
                if (currentIndex < recommendations.length) {
                    setDisplayedText(recommendations.slice(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                    setIsTyping(false);
                }
            }, 50);

            return () => clearInterval(typingInterval);
        } else {
            setDisplayedText('');
        }
    }, [isVisible, recommendation]);

    useEffect(() => {
        if (!isVisible) {
            hasGeneratedRef.current = false;
            return;
        }

        if (weatherData && !hasGeneratedRef.current && hasWeatherChanged(weatherData)) {
            generateRecommendation(weatherData);
        }
    }, [isVisible, weatherData]);

    const textStyle = isEmbedded ? { color: 'var(--ai-text-color, #ffffff)' } : {};

    if (!isVisible) return null;

    return (
        <div className="w-full max-w-[800px] mx-auto mb-8 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <svg 
                        className="w-6 h-6 text-blue-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                    <h3 className="text-xl font-semibold text-white">{t('ai.title')}</h3>
                </div>
                {recommendation && (
                    <button
                        onClick={handleReset}
                        disabled={isRefreshing}
                        className={`px-3 py-1 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 flex items-center gap-2 ${isRefreshing ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isRefreshing ? (
                            <>
                                <div className="animate-spin w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full"></div>
                                {t('ai.refreshing')}
                            </>
                        ) : (
                            <>
                                <svg 
                                    className="w-4 h-4" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                                    />
                                </svg>
                                {t('ai.reset')}
                            </>
                        )}
                    </button>
                )}
            </div>
            <div className="text-white/90">
                {isLoading && !isRefreshing ? (
                    <div className="flex items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                    </div>
                ) : (
                    <div className="typing-container">
                        <p 
                            className={`leading-relaxed whitespace-pre-line ${isTyping ? 'typing-cursor' : ''}`} 
                            dangerouslySetInnerHTML={{ __html: displayedText || recommendation }}
                        ></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIRecommendations;