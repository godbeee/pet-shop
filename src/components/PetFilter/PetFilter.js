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
          <div>
            <input
              onChange={(e) => handleChangeInput(e.target.value)}
              placeholder="search..."
              className="form-control"
            />
          </div>
          <div>
            <select onChange={handleChange} className="form-control">
              <option>Order By</option>
              <option value={"name"}>A - Z</option>
              <option value={"-name"}>Z - A</option>
              <option value={"price"}>From lowest price</option>
              <option value={"-price"}>From highest price</option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
}

export default PetFilter;
