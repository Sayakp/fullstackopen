import React from "react";

const Person = ({ person, onDeleteHandler }) => {
  const onDeleteConfirm = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      onDeleteHandler(person.id);
    }
  };
  return (
    <div>
      {person.name} {person.number}
      <button onClick={onDeleteConfirm}>delete</button>
    </div>
  );
};

export default Person;
