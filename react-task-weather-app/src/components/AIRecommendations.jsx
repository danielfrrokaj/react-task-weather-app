import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../context/TranslationContext';

const AIRecommendations = ({ weatherData, isVisible }) => {
    const [recommendation, setRecommendation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const lastWeatherState = useRef(null);
    const hasGeneratedRef = useRef(false);
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

    const hasWeatherChanged = (currentWeather) => {
        if (!lastWeatherState.current) return true;
        return (
            lastWeatherState.current.current.temp_c !== currentWeather.current.temp_c ||
            lastWeatherState.current.current.condition.text !== currentWeather.current.condition.text ||
            lastWeatherState.current.current.humidity !== currentWeather.current.humidity ||
            lastWeatherState.current.location.name !== currentWeather.location.name ||
            lastWeatherState.current.location.country !== currentWeather.location.country
        );
    };

    const generateRecommendation = async (weatherInfo) => {
        if (isLoading) return;
        setIsLoading(true);
        hasGeneratedRef.current = true;
        try {
            const prompt = `Given the current weather conditions:
                - Temperature: ${Math.round(weatherInfo.current.temp_c)}°C
                - Condition: ${weatherInfo.current.condition.text}
                - Humidity: ${weatherInfo.current.humidity}%
                - Location: ${weatherInfo.location.name}, ${weatherInfo.location.country}
                
                Provide two specific recommendations: (keep it as short and concise)
                1. ${t('ai.clothing')}: List essential clothing items and accessories suitable for these conditions.
                2. ${t('ai.activities')}: Suggest 2-3 weather-appropriate outdoor activities.`;

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "mixtral-8x7b-32768",
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 150,
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
            setRecommendation(formattedResponse);
            lastWeatherState.current = weatherInfo;
        } catch (error) {
            console.error('Error generating recommendation:', error);
            setRecommendation(t('ai.error'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setRecommendation('');
        lastWeatherState.current = null;
        hasGeneratedRef.current = false;
    };

    useEffect(() => {
        if (!isVisible) {
            hasGeneratedRef.current = false;
            return;
        }

        if (weatherData && !hasGeneratedRef.current && hasWeatherChanged(weatherData)) {
            generateRecommendation(weatherData);
        }
    }, [isVisible, weatherData]);

    if (!isVisible) return null;

    return (
        <div className="w-full max-w-[800px] mx-auto mb-8 overflow-hidden">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
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
                    {recommendation && !isLoading && (
                        <button
                            onClick={handleReset}
                            className="px-3 py-1 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 flex items-center gap-2"
                        >
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
                        </button>
                    )}
                </div>
                <div className="text-white/90">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                        </div>
                    ) : (
                        <p className="leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: recommendation }}></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIRecommendations;