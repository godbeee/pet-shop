import classes from "./OutstandingPets.module.css";
import PetItem from "../PetList/PetItem/PetItem";
import { baseURL } from "../../config/config";
import { useEffect, useState } from "react";

function OutstandingPets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function fetchPets() {
      const res = await fetch(`${baseURL}/outstanding`);
      const data = await res.json();
      setPets(data.pets);
    }
    fetchPets();
  }, []);

  return (
    <>
      <div style={{ margin: "2rem 0" }}>
        {pets.length > 0 && (
          <h2 style={{ marginBottom: "1.5rem" }}>Outstanding Pets</h2>
        )}
        <div className={classes.list}>
          {pets.length > 0 &&
            pets.map((pet) => <PetItem key={pet._id} pet={pet} />)}
        </div>
      </div>
    </>
  );
}

export default OutstandingPets;
