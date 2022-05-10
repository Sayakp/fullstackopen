import React from "react";
import Weather from "./Weather";

const CountryInfo = ({ country }) => {
  const { capital, languages, area, name, flags } = country;

  return (
    <div>
      <h2>{name.common}</h2>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.values(languages).map((language) => (
            <li key={country + language}>{language}</li>
          ))}
        </ul>
        <img src={flags.png} />
        <Weather capital={capital} />
      </div>
    </div>
  );
};

export default CountryInfo;
