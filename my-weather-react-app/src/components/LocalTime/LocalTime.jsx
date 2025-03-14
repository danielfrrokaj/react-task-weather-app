import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './LocalTime.css';

const LocalTime = () => {
    const { t, i18n } = useTranslation();
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const updateDate = () => {
            setCurrentDate(new Date());
        };

        // Update date immediately and then set an interval to update every minute
        updateDate();
        const intervalId = setInterval(updateDate, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const formatDate = () => {
        if (i18n.language === 'sq') {
            const day = currentDate.getDate();
            const month = t(`months.${currentDate.toLocaleString('en', { month: 'long' }).toLowerCase()}`);
            const year = currentDate.getFullYear();
            const weekday = t(`days.${currentDate.toLocaleString('en', { weekday: 'long' }).toLowerCase()}`);
            
            return `${weekday}, ${day} ${month} ${year}`;
        } else {
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            return new Intl.DateTimeFormat(i18n.language, options).format(currentDate);
        }
    };

    return (
        <div className="local-time-container">
            <p className="day-text">
                {t('today')} {formatDate()}
            </p>
        </div>
    );
};

export default LocalTime; 