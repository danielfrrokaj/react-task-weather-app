import { useState } from 'react';
import { CAPITAL_CITIES } from '../services/weatherService';

// Get unique countries from CAPITAL_CITIES
const uniqueCountries = [...new Set(CAPITAL_CITIES.map(city => city.country))].sort();

const Header = ({ selectedCountry, onCountryChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="max-w-[800px] mx-auto mb-8 text-center relative pt-[60px] md:pt-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg ">
                Weather in{' '}
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="inline-flex items-center hover:text-blue-300 transition-colors"
                >
                    {selectedCountry}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-8 w-8 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </h1>
            <p className="text-white/80 text-lg font-light">
                Explore weather conditions in {selectedCountry}
            </p>

            {/* Country Dropdown */}
            {isDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 w-64 mt-2 py-2 bg-white/10 backdrop-blur-md rounded-lg shadow-lg z-10">
                    <div className="max-h-60 overflow-y-auto">
                        {uniqueCountries.map((country) => (
                            <button
                                key={country}
                                onClick={() => {
                                    onCountryChange(country);
                                    setIsDropdownOpen(false);
                                }}
                                className={`w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${
                                    country === selectedCountry ? 'text-blue-300' : 'text-white'
                                }`}
                            >
                                {country}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header; 