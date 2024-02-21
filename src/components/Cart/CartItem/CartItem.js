import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { cartAction } from "../../../store/slices/cartSlice";
import { configMoney } from "../../../config/config";

function CartItem({ ci, isSummary = false }) {
  const dispatch = useDispatch();
  const price = new Intl.NumberFormat("it-IT", configMoney).format(ci?.price);
  function handleDelete() {
    dispatch(cartAction.deleteItem(ci._id));
  }
  function handleDecrease() {
    dispatch(cartAction.removeFromCart(ci._id));
  }
  function handleIncrease() {
    dispatch(
      cartAction.addToCart({
        ...ci,
        quantity: 1,
      })
    );
  }
  if (!isSummary) {
    return (
      <>
        <tr key={ci._id}>
          <th scope="row" className="border-0">
            <div className="p-2">
              {!ci.avatar && (
                <img
                  src="https://placehold.co/220x138?text=Empty"
                  alt="empty"
                  width="70"
                  className="img-fluid rounded shadow-sm"
                />
              )}
              {ci.avatar && (
                <img
                  src={ci?.avatar?.url}
                  alt={ci?.name}
                  width="70"
                  className="img-fluid rounded shadow-sm"
                />
              )}
              <div className="mx-3 d-inline-block align-middle">
                <h5 className="mb-0">
                  <span className="text-dark d-inline-block align-middle">
                    {ci.name}
                  </span>
                </h5>
                <span className="text-muted font-weight-normal font-italic d-block">
                  Type: {ci.type}
                </span>
              </div>
            </div>
          </th>
          <td className="border-0 align-middle text-center">
            <span
              onClick={handleDecrease}
              style={{ cursor: "pointer" }}
              className="mx-2"
            >
              -
            </span>
            <strong>{price}</strong>
            <span
              onClick={handleIncrease}
              style={{ cursor: "pointer" }}
              className="mx-2"
            >
              +
            </span>
          </td>
          <td className="border-0 align-middle text-center">
            <strong>{ci.quantity}</strong>
          </td>
          <td className="border-0 align-middle text-center">
            <FaTrash style={{ cursor: "pointer" }} onClick={handleDelete} />
          </td>
        </tr>
      </>
    );
  } else {
    return (
      <>
        <tr key={ci._id}>
          <th scope="row" className="border-0">
            <div className="p-2">
              {!ci.avatar && (
                <img
                  src="https://placehold.co/220x138?text=Empty"
                  alt="empty"
                  width="70"
                  className="img-fluid rounded shadow-sm"
                />
              )}
              {ci.avatar && (
                <img
                  src={ci?.avatar?.url}
                  alt={ci?.name}
                  width="70"
                  className="img-fluid rounded shadow-sm"
                />
              )}
              <div className="mx-3 d-inline-block align-middle">
                <h5 className="mb-0">
                  <span className="text-dark d-inline-block align-middle">
                    {ci.name}
                  </span>
                </h5>
                <span className="text-muted font-weight-normal font-italic d-block">
                  Type: {ci.type}
                </span>
              </div>
            </div>
          </th>

          <td className="border-0 align-middle text-center">
            <strong>x{ci.quantity}</strong>
          </td>
          <td className="border-0 align-middle text-center">
            <strong>{price}</strong>
          </td>
        </tr>
      </>
    );
  }
}

export default CartItem;
