// React passes props as an object, so it needs to be destructured,
// to extract the array to mapped.
const Display = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}{" "}
            <button id={person.id} onClick={() => handleDelete(person.id)}>
              Delete
            </button>
          </p>
        );
      })}
    </>
  );
};

export default Display;
