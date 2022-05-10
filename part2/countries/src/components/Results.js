import React from "react";
import CountryInfo from "./CountryInfo";
import ResultItem from "./ResultItem";

const Results = ({ countries }) => {
  return (
    <div>
      {countries.length > 10
        ? "Too many countries, specify another filter"
        : countries.map((country) =>
            countries.length === 1 ? (
              <CountryInfo country={country} key={country.name.common} />
            ) : (
              <ResultItem country={country} key={country.name.common} />
            )
          )}
    </div>
  );
};

export default Results;
