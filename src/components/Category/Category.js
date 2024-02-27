import classes from "./Category.module.css";
import dog from "../../assets/dog.avif";
import cat from "../../assets/cat.avif";
import { Link } from "react-router-dom";

function Category() {
  return (
    <>
      <h2 className={classes.center}>Shop By Category</h2>
      <div className={classes.container}>
        <Link to={"/pets/dog"} className={`${classes.btn} ${classes.item}`}>
          <img src={dog} alt="dog" />
        </Link>
        <Link to={"pets/cat"} className={`${classes.btn} ${classes.item}`}>
          <img src={cat} alt="cat" />
        </Link>
      </div>
    </>
  );
}

export default Category;
