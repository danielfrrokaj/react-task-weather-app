import { useState } from 'react';
import './SearchBar.css';
import { ALBANIAN_CITIES } from '../utils/weatherApi';

const SearchBar = ({ onCitySelect, selectedCity = 'Tirana' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        // Check if the search term is a valid city
        if (ALBANIAN_CITIES.includes(searchTerm)) {
            onCitySelect(searchTerm);
            setSearchTerm('');
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filter cities based on input
        if (value.length > 0) {
            const filteredCities = ALBANIAN_CITIES.filter(city => 
                city.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredCities);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (city) => {
        onCitySelect(city);
        setSearchTerm('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    // Create a placeholder text that includes the selected city
    const placeholderText = `${selectedCity}, Shqipëri`;

    return (
        <div className="search-container">
            <p className="search-title">Kerko vendin</p>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    className="search-input"
                    placeholder={placeholderText}
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                <button type="submit" className="search-button">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="search-icon"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
                
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((city, index) => (
                            <li 
                                key={index} 
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick(city)}
                            >
                                {city}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
};

export default SearchBar; 