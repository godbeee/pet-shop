import { useSelector } from "react-redux";
import CartItem from "../Cart/CartItem/CartItem";
import { configMoney } from "../../config/config";

function SummaryOrder() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const formatedPrice = new Intl.NumberFormat("it-IT", configMoney).format(
    totalPrice
  );
  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="border-0 bg-light">
                <div className="p-2 px-3 text-uppercase">Name</div>
              </th>
              <th scope="col" className="border-0 bg-light text-center">
                <div className="py-2 text-uppercase">Quantity</div>
              </th>
              <th scope="col" className="border-0 bg-light text-center">
                <div className="py-2 text-uppercase">Price</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((ci) => (
              <CartItem key={ci._id} ci={ci} isSummary />
            ))}
            {cartItems.length < 1 && (
              <tr>
                <td
                  style={{ color: "#8CB9BD" }}
                  colspan="3"
                  className="text-center w-100 fs-3"
                >
                  No Pet Selected!
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <hr></hr>
        <div className="d-flex justify-content-end">
          <p>
            <strong>Total Price:</strong> {formatedPrice}
          </p>
        </div>
      </div>
    </>
  );
}

export default SummaryOrder;
