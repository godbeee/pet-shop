import classes from "./NavCate.module.css";
import { Link } from "react-router-dom";
import { PiDogFill } from "react-icons/pi";
import { LuCat } from "react-icons/lu";

function NavCate({ cate }) {
  return (
    <>
      <div className={classes.container}>
        <Link
          to={"/pets/dog"}
          className={`${
            classes.btn
          } d-flex justify-content-center align-items-center ${
            cate === "dog" ? classes.active : ""
          }`}
        >
          <PiDogFill className={classes.label} />
          <span>dog</span>
        </Link>
        <Link
          to={"/pets/cat"}
          className={`${
            classes.btn
          } d-flex justify-content-center align-items-center ${
            cate === "cat" ? classes.active : ""
          }`}
        >
          <LuCat className={classes.label} />
          <span>cat</span>
        </Link>
      </div>
    </>
  );
}

export default NavCate;
