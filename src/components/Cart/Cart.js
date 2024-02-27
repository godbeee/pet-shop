import { useSelector } from "react-redux";
import CartItem from "./CartItem/CartItem";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
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
                <div className="py-2 text-uppercase">Price</div>
              </th>
              <th scope="col" className="border-0 bg-light text-center">
                <div className="py-2 text-uppercase">Quantity</div>
              </th>
              <th scope="col" className="border-0 bg-light text-center">
                <div className="py-2 text-uppercase">Remove</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((ci) => (
              <CartItem key={ci._id} ci={ci} />
            ))}
            {cartItems.length < 1 && (
              <tr>
                <td
                  style={{ color: "#8CB9BD" }}
                  colSpan="4"
                  className="text-center w-100 fs-3"
                >
                  No Pet Selected!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Cart;
