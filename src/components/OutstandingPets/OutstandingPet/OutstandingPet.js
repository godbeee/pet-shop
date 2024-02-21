import classes from "./OutstandingPet.module.css";
import { FaShoppingCart } from "react-icons/fa";
import Stack from "react-bootstrap/Stack";
import { useDispatch } from "react-redux";
import { cartAction } from "../../../store/slices/cartSlice";
import { configMoney } from "../../../config/config";

function OutstandingPet({ pet }) {
  const dispatch = useDispatch();

  function handleAddItemToCart() {
    dispatch(
      cartAction.addToCart({
        ...pet,
        quantity: 1,
      })
    );
  }
  return (
    <>
      <div className={classes.item}>
        <div>
          {!pet.avatar && (
            <img src="https://placehold.co/220x138?text=Empty" alt="empty" />
          )}
          {pet.avatar && <img src={pet.avatar.url} alt={pet.name} />}
        </div>
        <div className={classes.body}>
          <Stack className="mb-3" direction="horizontal" gap={2}>
            <div className={classes.tag}>{pet.type}</div>
            <div className={classes.tag}>{pet.breed}</div>
          </Stack>
          <h4>{pet.name}</h4>
          <p style={{ marginBottom: 0 }}>
            {new Intl.NumberFormat("it-IT", configMoney).format(pet.price)}
          </p>
        </div>
        <div className={classes.info}>
          <div>
            <strong>Age: {pet.age} year</strong>
          </div>
          <div>
            <strong>Weight: {pet.weight} kg</strong>
          </div>
        </div>
        <div className={classes.action}>
          <button
            onClick={handleAddItemToCart}
            style={{ gap: "0.5rem" }}
            className="d-flex justify-content-center align-items-center"
          >
            Add to cart <FaShoppingCart />
          </button>
        </div>
      </div>
    </>
  );
}

export default OutstandingPet;
