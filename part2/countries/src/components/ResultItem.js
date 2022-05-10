import React, { useState } from "react";
import CountryInfo from "./CountryInfo";

const ResultItem = ({ country }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      {country.name.common}
      <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      {show && (
        <>
          <CountryInfo country={country} />
        </>
      )}
    </div>
  );
};

export default ResultItem;
