import { useState, useEffect } from "react";
import axios from "axios";
import Display from "./components/Display";
import Submit from "./components/Submit";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [displayPersons, setDisplayPersons] = useState(persons);

  // Get full list of persons to display to the DOM
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [persons]);

  // UseEffect hook makes changes to the list happen immediately
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
      const id = persons.length + 1;

      axios
        .post("http://localhost:3001/persons", {
          id: id,
          name: newName,
          number: phoneNumber,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }

    setNewName("");
    setPhoneNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        nameSearch={nameSearch}
        handleNameSearchChange={handleNameSearchChange}
      />
      <h2>Add New Entry</h2>
      {/* Methods passed as props do not need parantheses, as with handleAddPerson */}
      <Submit
        handleAddPerson={handleAddPerson}
        newName={newName}
        setNewName={setNewName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <h2>Numbers</h2>
      <Display persons={displayPersons} />
    </div>
  );
};

export default App;
