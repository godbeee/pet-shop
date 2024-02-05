import classes from "./OutstandingPets.module.css";
import Card from "../UI/Card";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

function OutstandingPets() {
  return (
    <>
      <Card className={"mt-4 p-3"}>
        <h2>Outstanding Pets</h2>
        <div className={classes["sub-cates"]}>
          <button className={classes["sub-cate"]}>husky</button>
          <button className={classes["sub-cate"]}>corgi</button>
          <button className={classes["sub-cate"]}>alaska</button>
        </div>
        <div className={classes.list}>
          <div className={classes.item}>
            <div>
              <img src="https://images.pexels.com/photos/164186/pexels-photo-164186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </div>
            <div className={classes.body}>
              <Stack className="mb-3" direction="horizontal" gap={2}>
                <Badge pill bg="success">
                  dog
                </Badge>
                <Badge pill bg="success">
                  corgi
                </Badge>
              </Stack>
              <h4>title</h4>
              <div>
                <span>
                  <strong>info:</strong>
                </span>
                <ul>
                  <li>age:</li>
                  <li>hobbies:</li>
                </ul>
              </div>
              <div>
                <span className={classes.stand}>
                  <FaHeart />
                </span>
                <span className={classes.stand}>
                  <FaShoppingCart />
                </span>
              </div>
            </div>
          </div>
          <div className={classes.item}></div>
          <div className={classes.item}></div>
          <div className={classes.item}></div>
          <div className={classes.item}></div>
        </div>
      </Card>
    </>
  );
}

export default OutstandingPets;
