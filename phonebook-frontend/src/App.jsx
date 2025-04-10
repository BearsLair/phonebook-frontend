import { useState, useEffect } from "react";
import Display from "./components/Display";
import Submit from "./components/Submit";
import Filter from "./components/Filter";
import {
  addPerson,
  getAllPersons,
  changeNumber,
  deletePerson,
} from "./server/backend";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [displayPersons, setDisplayPersons] = useState([]);

  // Fetch all persons from backend when component mounts
  useEffect(() => {
    getAllPersons()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Runs only once when the component mounts

  //Filters the list in real-time
  useEffect(() => {
    setDisplayPersons(
      persons.filter((person) => {
        return person.name.toLowerCase().includes(nameSearch.toLowerCase());
      })
    );
  }, [persons, nameSearch]); // Runs when persons or nameSearch is altered

  const handleNameSearchChange = (event) => {
    setNameSearch(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    const duplicateExists = persons.some((person) => newName === person.name);

    // If a duplicate exists, ask whether a person's number should be changed.
    if (duplicateExists) {
      if (window.confirm(`Do you want to change ${newName}'s number?`)) {
        const personToChange = persons.filter(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );

        const id = personToChange[0].id;

        changeNumber(id, phoneNumber)
          .then(() => {
            return getAllPersons();
          })
          .then((updatedPersons) => {
            setPersons(updatedPersons);
          })
          .catch((error) => console.error("Error updating number", error));

        setNewName("");
        setPhoneNumber("");
      } else {
        console.log(`User declined to change ${newName}'s number.`);
      }
    } else {
      const id = persons.length + 1;

      // Use Axios properly by calling addPerson()
      addPerson(id, newName, phoneNumber)
        .then((newPerson) => {
          if (newPerson) {
            setPersons((prev) => [...prev, newPerson]);
            setDisplayPersons((prev) => [...prev, newPerson]);
          }
        })
        .catch((error) => {
          console.error("Error adding person:", error);
        });
    }

    setNewName("");
    setPhoneNumber("");
  };

  // Deletes user from database, useEffect above automatically updates list of persons
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deletePerson(Number(id))
        .then(() => {
          // Update the state to remove the deleted person
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
          setDisplayPersons((prevDisplayPersons) =>
            prevDisplayPersons.filter((person) => person.id !== id)
          );
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
        });
    } else {
      console.log("Deletion aborted");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        nameSearch={nameSearch}
        handleNameSearchChange={handleNameSearchChange}
      />
      <h2>Add New Entry</h2>
      <Submit
        handleAddPerson={handleAddPerson}
        newName={newName}
        setNewName={setNewName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <h2>Numbers</h2>
      <Display persons={displayPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
