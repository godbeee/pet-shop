import { baseURL, configMoney } from "../../../../../config/config";
import { toast } from "react-toastify";

function OrderTable({ orders, handleShow, setOrderId, fetchOrders }) {
  let i = 1;
  function notify(msg, isError) {
    if (isError) {
      return toast.error(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    return toast.success(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  function handleView(id) {
    setOrderId(id);
    handleShow();
  }
  async function handleDelete(id) {
    const isConfirm = window.confirm("are u sure delete this?");
    if (isConfirm) {
      const res = await fetch(`${baseURL}/admin/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();
      notify("delete order success!");
      fetchOrders();
    }
  }
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th className="col-md-4" scope="col">
              Name
            </th>
            <th scope="col">Phone</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
            <th className="col-md-2" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr valign="middle" key={order._id}>
              <th scope="row">{i++}</th>
              <td>{order.name}</td>
              <td>{order.phone}</td>
              <td>
                {new Intl.NumberFormat("it-IT", configMoney).format(
                  order.total
                )}
              </td>
              <td className="text-capitalize">
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 16px",
                    outline: "1px solid #40A2E3",
                    borderRadius: "8px",
                  }}
                >
                  {order.status}
                </span>
              </td>
              <td>
                <button
                  onClick={() => handleView(order._id)}
                  className="btn btn-success mx-2"
                >
                  view
                </button>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="btn btn-danger mx-2"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td className="text-center fw-bold" colSpan={6}>
                No Order!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default OrderTable;
