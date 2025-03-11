import { useState, useEffect } from 'react';
import './LocalTime.css';

const LocalTime = () => {
    const [currentDay, setCurrentDay] = useState('');

    useEffect(() => {
        const updateDay = () => {
            const days = [' dielë', ' hënë', ' martë', ' mërkurë', ' enjte', ' premte', ' shtunë'];
            const today = new Date();
            setCurrentDay(days[today.getDay()]);
        };

        updateDay(); // Initial update
        
        // Update every minute to keep it current
        const intervalId = setInterval(updateDay, 60000);
        
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="local-time-container">
            <p className="day-text">Sot është e{currentDay}</p>
        </div>
    );
};

export default LocalTime; 