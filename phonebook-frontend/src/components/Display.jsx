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
