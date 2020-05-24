import React, { useState } from 'react';
import './App.css';
import {get} from 'axios';

const api = {
  key: "776e22c0153855dc97f7ba7ecfb9178a",
  base: "https://api.openweathermap.org/data/2.5/"
}

export default function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [date, setDate] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      get(api.base+'weather?q='+query+'&units=metric&APPID='+api.key)
      .then(result => {
            setWeather(result.data);
            setQuery('');
            console.log(result.data);
          });
      get('https://heathier-carburetor.000webhostapp.com/time.php').then(res => {
          const data = res.data
          setDate(data)
      });
    }
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{date}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}
