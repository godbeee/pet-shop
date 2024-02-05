import classes from "./CartPage.module.css";
import Cart from "../../components/Cart/Cart";
import CartTotal from "../../components/CartTotal/CartTotal";
import { Link } from "react-router-dom";

function CartPage() {
  return (
    <>
      <div className={classes.card}>
        <div class="row">
          <div className={`col-md-8 ${classes.cart}`}>
            <Cart />
            <div className=" mt-1 mb-1 d-flex justify-content-between align-items-center">
              <Link
                to="/shop"
                className={`${classes.temp} text-decoration-none text-secondary fst-italic fs-5 d-flex align-items-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-left me-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                Continue shopping
              </Link>
              <Link
                to="/checkout"
                className={`text-decoration-none text-secondary fst-italic fs-5 d-flex align-items-center`}
              >
                Process to checkout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-right ms-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className={`col-md-4 ${classes.summary}`}>
            <CartTotal />
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
