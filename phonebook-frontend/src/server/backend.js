import axios from "axios";
const URL = "http://localhost:3001/persons";

// Fetch all persons from the database
const getAllPersons = () => {
  return axios
    .get(URL)
    .then((response) => response.data) // Return the data
    .catch((error) => {
      console.error("Error fetching persons:", error);
      return []; // Return an empty array in case of an error
    });
};

// Add a new person to the database
const addPerson = (id, newName, phoneNumber) => {
  return axios
    .post(URL, {
      id,
      name: newName,
      number: phoneNumber,
    })
    .then((response) => response.data) // Return the newly added person
    .catch((error) => {
      console.error("Error adding person:", error);
      return null;
    });
};

const deletePerson = (id) => {
  return axios
    .delete(`${URL}/${id}`)
    .then(() => id) // Return a resolved promise
    .catch((error) => {
      console.error("Error deleting person:", error);
      throw error; // Rethrow error to be handled in App.jsx
    });
};

export { addPerson, getAllPersons, deletePerson };
