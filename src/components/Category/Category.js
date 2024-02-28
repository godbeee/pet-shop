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
        <Link to={"/"} className={`${classes.btn} ${classes.item}`}>
          <p
            style={{ color: "#35374B", fontWeight: "500" }}
            className="text-center mb-0"
          >
            Vì gói free nên server không hoạt động 24/7. Vì vậy nếu bạn vào
            trang web mà không có dữ liệu, vui lòng đợi 1 chút để server reload
            lại nhé !!!
          </p>
        </Link>
      </div>
    </>
  );
}

export default Category;
