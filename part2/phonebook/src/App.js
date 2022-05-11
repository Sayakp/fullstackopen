import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/Phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialNumbers) => setPersons(initialNumbers));
  }, []);

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (newName === "" || newNumber === "") {
      alert("Empty name or number");
    } else {
      // Check if name already exists
      const oldEntry = persons.filter((person) => person.name === newName);

      // Update Case
      if (oldEntry.length > 0) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const newPerson = {
            name: newName,
            number: newNumber,
          };
          phonebookService
            .update(oldEntry[0].id, newPerson)
            .then((updatedPerson) =>
              setPersons(
                persons.map((person) =>
                  person.id !== updatedPerson.id ? person : updatedPerson
                )
              )
            )
            .catch((error) => {
              alert("Error updating info");
            });
        }
      } else {
        // New entry Case
        const newPerson = {
          name: newName,
          number: newNumber,
        };
        phonebookService
          .create(newPerson)
          .then((newPersonResponse) => {
            setPersons(persons.concat(newPersonResponse));
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            alert("Error adding a new entry");
          });
      }
    }
  };

  const onDeleteHandler = (id) => {
    phonebookService
      .deletePerson(id)
      .then((responseStatus) => {
        if (responseStatus === 200) {
          setPersons(persons.filter((person) => person.id !== id));
        }
      })
      .catch((error) => {
        alert("Error deleting the entry");
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        onSubmitHandler={onSubmitHandler}
      />
      <Persons persons={personsToShow} onDeleteHandler={onDeleteHandler} />
    </div>
  );
};

export default App;
