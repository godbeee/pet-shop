import classes from "./CartTotal.module.css";
import { FaGift } from "react-icons/fa";
import { useSelector } from "react-redux";
import { configMoney } from "../../config/config";
import { Link } from "react-router-dom";

function CartTotal() {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const formatedPrice = new Intl.NumberFormat("it-IT", configMoney).format(
    totalPrice
  );
  const cartItems = useSelector((state) => state.cart.cartItems);
  const url = cartItems.length === 0 ? null : "/checkout";
  return (
    <>
      <div>
        <h5>
          <b>Summary</b>
        </h5>
      </div>
      <hr />
      <form className={classes.form}>
        <p className="fst-italic mb-2 px-1">
          If you have a coupon code, please enter it
        </p>
        <div
          style={{ backgroundColor: "#fff" }}
          className="input-group mb-4 border rounded-pill p-2"
        >
          <input
            type="text"
            placeholder="Apply coupon"
            className="form-control border-0"
          />
          <div className="input-group-append border-0 d-flex align-items-center">
            <button
              id="button-addon3"
              type="button"
              className="btn btn-dark px-4 rounded-pill d-flex gap-2 align-items-center"
            >
              <FaGift />
              <span className={classes.coupon}>Apply coupon</span>
            </button>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col">
          <strong>Total Price:</strong> {formatedPrice}
        </div>
      </div>
      <Link to={url} className="btn btn-success w-100 mt-4">
        CHECKOUT
      </Link>
    </>
  );
}

export default CartTotal;
