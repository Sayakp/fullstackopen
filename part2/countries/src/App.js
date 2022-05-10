import Filter from "./components/Filter";
import Results from "./components/Results";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const filteredCountries =
    filter === ""
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        );

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Results countries={filteredCountries} />
    </div>
  );
}

export default App;
