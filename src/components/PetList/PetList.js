import classes from "./PetList.module.css";
import PetItem from "./PetItem/PetItem";

function PetList({ pets }) {
  return (
    <>
      <div className={classes.list}>
        {pets.length > 0 &&
          pets.map((pet) => <PetItem key={pet._id} pet={pet} />)}
      </div>
    </>
  );
}

export default PetList;
