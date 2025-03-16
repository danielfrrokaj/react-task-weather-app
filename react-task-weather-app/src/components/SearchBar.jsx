import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { CAPITAL_CITIES } from '../services/weatherService';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionsRef = useRef(null);
    const { t } = useTranslation();

    // Filter suggestions based on query
    useEffect(() => {
        if (query.trim().length < 2) {
            setSuggestions([]);
            return;
        }

        const lowerCaseQuery = query.toLowerCase();
        const filteredSuggestions = CAPITAL_CITIES.filter(city => 
            city.city.toLowerCase().includes(lowerCaseQuery) || 
            city.country.toLowerCase().includes(lowerCaseQuery)
        ).slice(0, 5); // Limit to 5 suggestions

        setSuggestions(filteredSuggestions);
    }, [query]);

    // Handle click outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            setQuery('');
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        onSearch(suggestion.city);
        setQuery('');
        setShowSuggestions(false);
    };

    return (
        <div className="w-full max-w-[800px] mx-auto mt-4 px-4">
            <div className="relative" ref={suggestionsRef}>
                <form 
                    onSubmit={handleSubmit}
                    className="flex items-center bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-lg"
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder={t('search.placeholder')}
                        className="flex-grow py-3 px-4 bg-transparent text-white placeholder-white/60 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white p-3 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-slate-800/90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
                        <ul>
                            {suggestions.map((suggestion, index) => (
                                <li 
                                    key={`${suggestion.country}-${suggestion.city}`}
                                    className="border-b border-white/10 last:border-0"
                                >
                                    <button
                                        type="button"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center"
                                    >
                                        <span className="text-white font-medium">{suggestion.city}</span>
                                        <span className="text-white/60 text-sm ml-2">({t(`countries.${suggestion.country}`)})</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar; 