// React passes props as an object, so it needs to be destructured,
// to extract the array to mapped.
const Display = ({ persons }) => {
  return (
    <>
      {persons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        );
      })}
    </>
  );
};

export default Display;
