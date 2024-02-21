import classes from "./CartPage.module.css";
import Cart from "../../components/Cart/Cart";
import CartTotal from "../../components/CartTotal/CartTotal";
import { Link } from "react-router-dom";

function CartPage() {
  return (
    <>
      <div className={classes.banner}>
        <div>
          <nav className="breadcrumbs">
            <Link to="/" className="breadcrumbs__item">
              Home
            </Link>
            <Link to="/pets" className="breadcrumbs__item">
              Shop
            </Link>
            <Link to="/cart" className="breadcrumbs__item is-active">
              Cart
            </Link>
          </nav>
        </div>
      </div>
      <div className={classes.card}>
        <div className="row">
          <div className={`col-md-8 ${classes.cart}`}>
            <Cart />
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
