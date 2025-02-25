import { useState } from "react";
import Names from "./components/Names";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Patrick Gross" },
    { name: "Andrew Gross" },
    { name: "Matthew Gross" },
    { name: "Kathy Gross" },
  ]);
  const [newName, setNewName] = useState("");

  const nameInput = (event) => {
    setNewName(event.target.value);
  };

  const addName = (newName) => {
    setPersons(persons.push(newName));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={nameInput} />
        </div>
        <div>
          <button type="submit" onClick={addName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names persons={persons} />
    </div>
  );
};

export default App;
