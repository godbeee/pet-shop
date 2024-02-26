import classes from "./PetListRelate.module.css";
import PetItem from "../PetList/PetItem/PetItem";

function PetListRelate({ petRelate }) {
  return (
    <>
      {petRelate.length > 0 && (
        <h3 style={{ marginBottom: "1.5rem" }}>Relate Product</h3>
      )}
      <div className={classes.list}>
        {petRelate.length > 0 &&
          petRelate.map((pet) => <PetItem key={pet._id} pet={pet} />)}
      </div>
    </>
  );
}

export default PetListRelate;
