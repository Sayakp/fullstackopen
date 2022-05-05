import React from "react";
import Person from "./Person";

const Persons = ({ persons }) => {
  return (
    <>
      <h3>Numbers</h3>
      {persons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </>
  );
};

export default Persons;
