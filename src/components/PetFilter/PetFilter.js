import classes from "./PetFilter.module.css";
import { debounce } from "../../utils/ultils";

function PetFilter({ setSortBy, setKeyword }) {
  function handleChange(e) {
    setSortBy(e.target.value);
  }
  const handleChangeInput = debounce((value) => {
    setKeyword(value);
  });
  return (
    <>
      <div className={classes.container}>
        <form className={classes.form}>
          <input
            onChange={(e) => handleChangeInput(e.target.value)}
            placeholder="search..."
          />
          <select onChange={handleChange} className="dropdown">
            <option>Order By</option>
            <option value={"name"}>A - Z</option>
            <option value={"-name"}>Z - A</option>
            <option value={"price"}>From lowest price</option>
            <option value={"-price"}>From highest price</option>
          </select>
        </form>
      </div>
    </>
  );
}

export default PetFilter;
