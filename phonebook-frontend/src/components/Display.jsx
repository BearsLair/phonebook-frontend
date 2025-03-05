// React passes props as an object, so it needs to be destructured,
// to extract the array to mapped.
const Display = ({ persons }) => {
  console.log(persons);
  return (
    <>
      {persons.map((person, index) => {
        return (
          <p key={index}>
            {person.name} {person.number}
          </p>
        );
      })}
    </>
  );
};

export default Display;
