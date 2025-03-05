import { useState, useEffect } from "react";
import Display from "./components/Display";

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
  const [nameSearch, setNameSearch] = useState("");
  const [displayPersons, setDisplayPersons] = useState(persons);

  useEffect(() => {
    const filteredList = persons.filter(
      (person) => person.name.toLowerCase().includes(nameSearch.toLowerCase()) // Case-insensitive search
    );
    setDisplayPersons(filteredList);
  }, [nameSearch, persons]); // Re-run effect when nameSearch or persons change

  const handleNameSearchChange = (event) => {
    setNameSearch(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const duplicateExists = persons.some((person) => newName === person.name);

    if (duplicateExists) {
      alert(`${newName} is already in the phonebook.`);
    } else {
      const newPerson = { name: newName, number: phoneNumber };
      setPersons([...persons, newPerson]);
    }

    setNewName("");
    setPhoneNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter show with:
        <input
          type="text"
          value={nameSearch}
          onChange={handleNameSearchChange}
        />
      </div>
      <form onSubmit={handleAddPerson}>
        <h2>Add New Entry</h2>
        <div>
          name:{" "}
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          phone number:{" "}
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Display persons={displayPersons} />
    </div>
  );
};

export default App;
