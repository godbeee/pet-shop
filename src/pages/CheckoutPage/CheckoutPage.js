import classes from "./CheckoutPage.module.css";
import { Container, Row } from "react-bootstrap";
import FormOrder from "../../components/FormOrder/FormOrder";

function CheckoutPage() {
  return (
    <>
      <Container>
        <Row>
          <div class="col-md-6">
            <FormOrder />
          </div>
          <div class="col-md-6">total</div>
        </Row>
      </Container>
    </>
  );
}

export default CheckoutPage;
