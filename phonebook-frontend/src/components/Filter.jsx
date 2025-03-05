const Filter = ({ nameSearch, handleNameSearchChange }) => {
  return (
    <>
      filter show with:
      <input type="text" value={nameSearch} onChange={handleNameSearchChange} />
    </>
  );
};

export default Filter;
