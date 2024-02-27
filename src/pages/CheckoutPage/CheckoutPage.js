import classes from "./CheckoutPage.module.css";
import { Container, Row } from "react-bootstrap";
import FormOrder from "../../components/FormOrder/FormOrder";
import { Link } from "react-router-dom";
import SummaryOrder from "../../components/SummaryOrder/SummaryOrder";

function CheckoutPage() {
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
            <Link to="/cart" className="breadcrumbs__item">
              Cart
            </Link>
            <Link to="/checkout" className="breadcrumbs__item is-active">
              Checkout
            </Link>
          </nav>
        </div>
      </div>
      <Container className="mb-5">
        <Row>
          <div className={`col-md-6 ${classes.item1}`}>
            <FormOrder />
          </div>
          <div className={`col-md-6 ${classes.item2}`}>
            <SummaryOrder />
          </div>
        </Row>
      </Container>
    </>
  );
}

export default CheckoutPage;
