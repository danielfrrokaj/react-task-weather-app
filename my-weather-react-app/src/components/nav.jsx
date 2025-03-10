import { useState, useRef, useEffect } from "react";
import "./nav.css";
import rightArrow from "../assets/button_icon/right-arrow.png";
import rightArrowHover from "../assets/button_icon/right-arrow-hover.png";

const Nav = () => {
    // List of Albanian cities
    const albanianCities = [
        "Tirana", "Durrës", "Vlorë", "Shkodër", "Elbasan", 
        "Fier", "Korçë", "Berat", "Lushnjë", "Pogradec", 
        "Kavajë", "Gjirokastër", "Sarandë", "Peshkopi", "Kukës"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const [visibleCities, setVisibleCities] = useState([]);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [slideDirection, setSlideDirection] = useState(null);

    // Calculate how many cities to show based on screen width
    useEffect(() => {
        const updateVisibleCities = () => {
            const width = window.innerWidth;
            let visibleCount = 5; // Default for larger screens
            
            if (width < 768) {
                visibleCount = 3;
            }
            if (width < 480) {
                visibleCount = 1;
            }
            
            const cities = [];
            for (let i = 0; i < visibleCount; i++) {
                const index = (currentIndex + i) % albanianCities.length;
                cities.push(albanianCities[index]);
            }
            setVisibleCities(cities);
        };

        updateVisibleCities();
        window.addEventListener('resize', updateVisibleCities);
        
        return () => {
            window.removeEventListener('resize', updateVisibleCities);
        };
    }, [currentIndex, albanianCities]);

    const handlePrev = () => {
        setSlideDirection('slide-left');
        // Reset animation after a short delay to allow it to complete
        setTimeout(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === 0 ? albanianCities.length - 1 : prevIndex - 1
            );
            // Reset the slide direction after the animation completes
            setTimeout(() => setSlideDirection(null), 50);
        }, 50);
    };

    const handleNext = () => {
        setSlideDirection('slide-right');
        // Reset animation after a short delay to allow it to complete
        setTimeout(() => {
            setCurrentIndex((prevIndex) => 
                (prevIndex + 1) % albanianCities.length
            );
            // Reset the slide direction after the animation completes
            setTimeout(() => setSlideDirection(null), 50);
        }, 50);
    };

    return (
        <nav className="nav">
            <div className="nav-content">
                <div className="carousel-container">
                    <button 
                        className="carousel-button prev-button"
                        onClick={handlePrev}
                        onMouseEnter={() => setHoveredButton('prev')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        <img 
                            src={hoveredButton === 'prev' ? rightArrowHover : rightArrow} 
                            alt="Previous" 
                            className="prev-icon"
                        />
                    </button>
                    
                    <div className="carousel" ref={carouselRef}>
                        {visibleCities.map((city, index) => (
                            <div 
                                key={`${city}-${index}`} 
                                className={`carousel-item ${slideDirection}`}
                            >
                                {city}
                            </div>
                        ))}
                    </div>
                    
                    <button 
                        className="carousel-button next-button"
                        onClick={handleNext}
                        onMouseEnter={() => setHoveredButton('next')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        <img 
                            src={hoveredButton === 'next' ? rightArrowHover : rightArrow} 
                            alt="Next" 
                            className="next-icon"
                        />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Nav;