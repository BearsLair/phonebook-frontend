const Names = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => {
        return <p key={persons.indexOf(person)}>{person.name}</p>;
      })}
    </div>
  );
};

export default Names;
