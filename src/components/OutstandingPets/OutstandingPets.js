import classes from "./OutstandingPets.module.css";
import Card from "../UI/Card";
import OutstandingPet from "./OutstandingPet/OutstandingPet";
import { baseURL } from "../../config/config";
import { useEffect, useState } from "react";

function OutstandingPets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function fetchPets() {
      const res = await fetch(`${baseURL}/outstanding`);
      const data = await res.json();
      console.log(data);
      setPets(data.pets);
    }
    fetchPets();
  }, []);

  return (
    <>
      <Card className={"mt-4 p-3"}>
        <h2>Outstanding Pets</h2>
        {/* <div className={classes["sub-cates"]}>
          <button className={classes["sub-cate"]}>husky</button>
          <button className={classes["sub-cate"]}>corgi</button>
          <button className={classes["sub-cate"]}>alaska</button>
        </div> */}
        <div className={classes.list}>
          {pets.length > 0 &&
            pets.map((pet) => <OutstandingPet key={pet._id} pet={pet} />)}
        </div>
      </Card>
    </>
  );
}

export default OutstandingPets;
