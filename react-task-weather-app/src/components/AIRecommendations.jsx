import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../context/TranslationContext';

const AIRecommendations = ({ weatherData, isVisible }) => {
    const [recommendation, setRecommendation] = useState('');
    const [displayedText, setDisplayedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const lastWeatherState = useRef(null);
    const hasGeneratedRef = useRef(false);
    const { t } = useTranslation();

    const getTemperatureCategory = (temp) => {
        if (temp >= 30) return 'hot';
        if (temp >= 25) return 'warm';
        if (temp >= 20) return 'mild';
        if (temp >= 15) return 'cool';
        return 'cold';
    };

    const generateRecommendation = (weatherInfo) => {
        if (!weatherInfo) return;

        const isNewFormat = 'temperature' in weatherInfo;
        const temperature = isNewFormat ? weatherInfo.temperature : Math.round(weatherInfo.current.temp_c);
        const condition = isNewFormat ? weatherInfo.condition : weatherInfo.current.condition.text;
        const tempCategory = getTemperatureCategory(temperature);

        let recommendationText = '';

        // Add clothing recommendations
        recommendationText += t(`ai.recommendations.clothing.${tempCategory}.title`) + '\n';
        t(`ai.recommendations.clothing.${tempCategory}.items`).forEach(item => {
            recommendationText += `- ${item}\n`;
        });

        // Add activity recommendations
        recommendationText += '\n' + t(`ai.recommendations.activities.${tempCategory}.title`) + '\n';
        t(`ai.recommendations.activities.${tempCategory}.items`).forEach(item => {
            recommendationText += `- ${item}\n`;
        });

        // Add health recommendations based on conditions
        if (condition.toLowerCase().includes('rain')) {
            recommendationText += '\n' + t('ai.recommendations.health.rain.title') + '\n';
            t('ai.recommendations.health.rain.items').forEach(item => {
                recommendationText += `- ${item}\n`;
            });
        } else {
            recommendationText += '\n' + t(`ai.recommendations.health.${tempCategory}.title`) + '\n';
            t(`ai.recommendations.health.${tempCategory}.items`).forEach(item => {
                recommendationText += `- ${item}\n`;
            });
        }

        setRecommendation(recommendationText);
        setDisplayedText('');
        setIsTyping(true);
        lastWeatherState.current = weatherInfo;
    };

    const handleReset = () => {
        setRecommendation('');
        setDisplayedText('');
        setIsTyping(false);
        lastWeatherState.current = null;
        hasGeneratedRef.current = false;
        
        if (weatherData) {
            setTimeout(() => {
                generateRecommendation(weatherData);
            }, 100);
        }
    };

    // Typing animation effect
    useEffect(() => {
        if (!recommendation || !isTyping) return;
        
        const lines = recommendation.split('\n').filter(line => line.trim() !== '');
        let currentLineIndex = 0;
        let currentCharIndex = 0;
        
        const typingInterval = setInterval(() => {
            if (currentLineIndex < lines.length) {
                const currentLine = lines[currentLineIndex];
                
                if (currentCharIndex <= currentLine.length) {
                    const completedLines = lines.slice(0, currentLineIndex);
                    const typingLine = currentLine.substring(0, currentCharIndex);
                    let formattedText = [...completedLines, typingLine].join('\n');
                    
                    // Apply formatting
                    formattedText = formattedText.replace(/\b[A-Z]{2,}\b/g, match => `<strong>${match}</strong>`);
                    formattedText = formattedText.split('\n').map(line => {
                        if (line.trim().startsWith('-')) {
                            return `<br/>${line}`;
                        }
                        return line;
                    }).join('\n');
                    
                    setDisplayedText(formattedText);
                    currentCharIndex++;
                } else {
                    currentLineIndex++;
                    currentCharIndex = 0;
                    
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        const newTypingInterval = setInterval(() => {
                            if (currentLineIndex < lines.length) {
                                const currentLine = lines[currentLineIndex];
                                
                                if (currentCharIndex <= currentLine.length) {
                                    const completedLines = lines.slice(0, currentLineIndex);
                                    const typingLine = currentLine.substring(0, currentCharIndex);
                                    let formattedText = [...completedLines, typingLine].join('\n');
                                    
                                    formattedText = formattedText.replace(/\b[A-Z]{2,}\b/g, match => `<strong>${match}</strong>`);
                                    formattedText = formattedText.split('\n').map(line => {
                                        if (line.trim().startsWith('-')) {
                                            return `<br/>${line}`;
                                        }
                                        return line;
                                    }).join('\n');
                                    
                                    setDisplayedText(formattedText);
                                    currentCharIndex++;
                                } else {
                                    currentLineIndex++;
                                    currentCharIndex = 0;
                                }
                            } else {
                                clearInterval(newTypingInterval);
                                setIsTyping(false);
                            }
                        }, 30);
                    }, 500);
                }
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);
            }
        }, 30);
    }, [recommendation, isTyping]);

    // Generate recommendation when weather data changes
    useEffect(() => {
        if (weatherData && (!lastWeatherState.current || 
            lastWeatherState.current.temperature !== weatherData.temperature || 
            lastWeatherState.current.condition !== weatherData.condition)) {
            generateRecommendation(weatherData);
        }
    }, [weatherData]);

    if (!isVisible) return null;

    return (
        <div className="w-full max-w-[800px] mx-auto mt-4 px-4">
            <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">{t('ai.title')}</h2>
                    <button
                        onClick={handleReset}
                        className="text-white/70 hover:text-white transition-colors"
                    >
                        {t('ai.reset')}
                    </button>
                </div>
                <div 
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: displayedText || t('ai.loading') }}
                />
            </div>
        </div>
    );
};

export default AIRecommendations;