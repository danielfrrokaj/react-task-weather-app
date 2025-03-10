import { useState } from 'react'
import Nav from './components/nav'
import SearchBar from './components/SearchBar'
import LocalTime from './components/LocalTime'
import backgroundImage from './assets/background.jpg'
import './App.css'

function App() {
  return (
    <>
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Nav />
      <main className="main-content">
        <div className="flex-container">
          <div className="flex-item">
            <SearchBar />
          </div>
          <div className="flex-item">
            <LocalTime />
          </div>
        </div>
        {/* Your main content goes here */}
      </main>
    </div>  
    </> 
  );
}

export default App
