// Multiple props need to be destructured from a single object,
// NOT multiple objects.
const Submit = ({
  handleAddPerson,
  newName,
  setNewName,
  phoneNumber,
  setPhoneNumber,
}) => {
  return (
    <form onSubmit={handleAddPerson}>
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
  );
};

export default Submit;
