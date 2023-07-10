import React from 'react';
import BackgroungImage from './components/background/backgroungImage';
import GoogleSearch from './components/google-search/googleSearch';
import WeatherWidget from './components/weather-widget/weatherWidget';

function App() {
  return (
    <>
      <div className='position-relative'>
        <BackgroungImage />
        <GoogleSearch />
        <WeatherWidget />
      </div>
    </>
  );
}

export default App;
