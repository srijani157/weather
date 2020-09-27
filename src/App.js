import React, { useState } from "react";
const api = {
  key: "632f2aa05659f8386772f53444cf4aad",
  base: "https://api.openweathermap.org/data/2.5/"
};


function App() {
  const [start,setStart] = useState(1);
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setStart(0);
          setQuery('');
          console.log(result);
        })
        .catch(err => console.log(err));

    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
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
        
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
              <div className="weather1">
                feels like:{Math.round(weather.main.feels_like)}°c
                <br />
                min-temp:{Math.round(weather.main.temp_min)}°c
                <br />
                max-temp:{Math.round(weather.main.temp_max)}°c
                <br />
                humidity:{Math.round(weather.main.humidity)}
              </div>
            </div>
          </div>
        ) : (start  !==  1)?(
                <div>
                  <div className="location-box">
                    <div className="location">
                      <h1 style={{ color: "white" }}>not found</h1>
                    </div>
                  </div>
                </div>
        ) : (
            <div>
              <div className="location-box">
                <div className="location">
                  <h1 style={{ color: "white" }}>go ahead serach for a place</h1>
                </div>
              </div>
            </div>
        )}
      </main>
    </div>
  );
}

export default App;
