import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <p>Data fetched from weatherapi.com - <a href="https://github.com/danielfrrokaj/react-task-weather-app">
      This project's GitHub repository
      </a> - MIT Licese</p>
    </footer>
  );
};

export default Footer; 