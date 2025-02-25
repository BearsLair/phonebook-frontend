import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Patrick" },
    { name: "Kathy" },
    { name: "Matt" },
  ]);
  const [newName, setNewName] = useState("");

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAddName = (event) => {
    event.preventDefault();

    const duplicateExists = persons.some((person) => newName === person.name);

    if (duplicateExists) {
      alert(`${newName} is already in the phonebook.`);
      setNewName("");
    } else {
      setPersons([...persons, { name: `${newName}` }]);
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit" onClick={handleAddName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => {
        return <p key={index}>{person.name}</p>;
      })}
    </div>
  );
};

export default App;
