import classes from "./CartTotal.module.css";
import { FaGift } from "react-icons/fa";

function CartTotal() {
  return (
    <>
      <div>
        <h5>
          <b>Summary</b>
        </h5>
      </div>
      <hr />
      {/* <div className="row mb-3">
        <div className="col">ITEMS 3</div>
        <div className="col text-right">&euro; 132.00</div>
      </div> */}
      <form className={classes.form}>
        <p class="fst-italic mb-2 px-1">
          If you have a coupon code, please enter it
        </p>
        <div
          style={{ backgroundColor: "#fff" }}
          class="input-group mb-4 border rounded-pill p-2"
        >
          <input
            type="text"
            placeholder="Apply coupon"
            class="form-control border-0"
          />
          <div class="input-group-append border-0">
            <button
              id="button-addon3"
              type="button"
              className="btn btn-dark px-4 rounded-pill d-flex gap-2 align-items-center"
            >
              <FaGift />
              Apply coupon
            </button>
          </div>
        </div>
      </form>
      <div class="row">
        <div className="col">TOTAL PRICE</div>
        <div className="col text-right">&euro; 137.00</div>
      </div>
      <button className="btn btn-success w-100 mt-4">CHECKOUT</button>
    </>
  );
}

export default CartTotal;
