import classes from "./PetItem.module.css";
import { FaShoppingCart } from "react-icons/fa";
import Stack from "react-bootstrap/Stack";
import { useDispatch } from "react-redux";
import { cartAction } from "../../../store/slices/cartSlice";
import { configMoney } from "../../../config/config";
import { BiMessageSquareCheck } from "react-icons/bi";
import { LiaWeightSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

function PetItem({ pet }) {
  const dispatch = useDispatch();
  let name = pet?.name;
  if (name.length > 20) {
    name = pet?.name?.slice(0, 19) + "...";
  }
  console.log(name);
  function handleAddItemToCart(e) {
    dispatch(
      cartAction.addToCart({
        ...pet,
        quantity: 1,
      })
    );
  }
  return (
    <Link
      to={`/detail/${pet?._id}`}
      style={{ textDecoration: "none", color: "#000" }}
    >
      <article className={classes.article}>
        <div className={classes["article-wrapper"]}>
          <figure>
            {pet.avatar && <img src={pet.avatar.url} alt={pet.name} />}
            {!pet.avatar && (
              <img src="https://picsum.photos/id/1011/800/450" alt="" />
            )}
          </figure>
          <div className={classes["article-body"]}>
            <h2 className="mb-0">{name}</h2>
            <div>
              <Stack className="mb-3" direction="horizontal" gap={1}>
                <div className={classes.tag}>{pet.type}</div>
                <div className={classes.tag}>{pet.breed}</div>
              </Stack>
              <p style={{ marginBottom: 0, fontWeight: "500" }}>
                {new Intl.NumberFormat("it-IT", configMoney).format(pet.price)}
              </p>
            </div>
            <div className={classes.info}>
              <div className="d-flex align-items-center">
                <BiMessageSquareCheck className="mx-1" />
                <strong>Age :</strong>
                {pet.age} year
              </div>
              <div className="d-flex align-items-center">
                <LiaWeightSolid className="mx-1" />
                <strong>Weight :</strong>
                {pet.weight} kg
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
        </div>
      </article>
    </Link>
  );
}

export default PetItem;
