import classes from "./Category.module.css";
import dog from "../../assets/dog.avif";
import cat from "../../assets/cat.avif";
import rabbit from "../../assets/rabbit.png";

function Category() {
  return (
    <>
      <h2 className={classes.center}>Shop By Category</h2>
      <div className={classes.container}>
        <div className={classes.item}>
          <img src={dog} alt="dog" />
        </div>
        <div className={classes.item}>
          <img src={cat} alt="cat" />
        </div>
        <div className={classes.item}>
          <img src={rabbit} alt="rabbit" />
        </div>
      </div>
    </>
  );
}

export default Category;
