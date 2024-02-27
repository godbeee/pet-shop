import classes from "./PetList.module.css";
import PetItem from "./PetItem/PetItem";

function PetList({ pets }) {
  return (
    <>
      <div className={classes.list}>
        {pets.length > 0 &&
          pets.map((pet) => <PetItem key={pet._id} pet={pet} />)}
      </div>
      {/* <div style={{ textAlign: "center" }}>
        {pets.length === 0 && (
          <img
            style={{ borderRadius: "20px", cursor: "pointer" }}
            width={300}
            height={300}
            src="https://i.pinimg.com/564x/71/64/68/7164681b4c7ab1860859ffc9e00d1739.jpg"
            alt="empty"
          ></img>
        )}
      </div> */}
    </>
  );
}

export default PetList;
