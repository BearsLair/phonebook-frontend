import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Patrick", number: "650-923-9322" },
    { name: "Kathy", number: "650-922-0894" },
    { name: "Matt", number: "942-792-5669" },
    { name: "Andrew", number: "942-893-0579" },
    { name: "Patricia", number: "352-796-3575" },
    { name: "Andy", number: "792-359-7525" },
    { name: "Anthony", number: "659-302-6878" },
  ]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    const duplicateExists = persons.some((person) => newName === person.name);

    if (duplicateExists) {
      alert(`${newName} is already in the phonebook.`);
      setNewName("");
      setPhoneNumber("");
    } else {
      setPersons([
        ...persons,
        { name: `${newName}`, number: `${phoneNumber}` },
      ]);
      setNewName("");
      setPhoneNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Phone Number:{" "}
          <input
            type="text"
            value={phoneNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit" onClick={handleAddPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => {
        return (
          <p key={index}>
            {person.name} {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default App;
