import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
      )
      .then((response) => setWeather(response.data));
  }, []);

  console.log(weather);
  return (
    <div>
      {weather === null ? (
        <b>Loading Data</b>
      ) : (
        <>
          <h3>Weather in {capital}</h3>
          <div>temperatue {weather.main.temp} Celcius</div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <div>wind {weather.wind.speed} m/s</div>
        </>
      )}
    </div>
  );
};

export default Weather;
