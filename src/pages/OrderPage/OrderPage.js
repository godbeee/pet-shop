import { Container } from "react-bootstrap";
import Card from "../../components/UI/Card";
import classes from "./OrderPage.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { baseURL, configMoney } from "../../config/config";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const state = useSelector((state) => state.user.data);
  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch(`${baseURL}/orders/users/${state.id}`);
      const data = await res.json();
      if (data.statusCode === 500) {
        return setOrders([]);
      }
      setOrders(data.orders);
    }
    if (state.id) {
      fetchOrders();
    }
  }, [state.id]);
  return (
    <>
      <Container style={{ marginTop: "4rem", height: "80vh" }}>
        <div className={classes.banner}>
          <div>
            <nav className="breadcrumbs">
              <Link to="/" className="breadcrumbs__item">
                Home
              </Link>
              <Link to="/order" className="breadcrumbs__item is-active">
                Oder
              </Link>
            </nav>
          </div>
        </div>
        <Card className={"mb-5 p-1"}>
          <h3 className="text-center my-3">Order List!</h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="border-0 bg-light">
                    <div className="p-2 px-3 text-uppercase">Name</div>
                  </th>
                  <th scope="col" className="border-0 bg-light text-center">
                    <div className="py-2 text-uppercase">Phone</div>
                  </th>
                  <th scope="col" className="border-0 bg-light text-center">
                    <div className="py-2 text-uppercase">Total</div>
                  </th>
                  <th scope="col" className="border-0 bg-light text-center">
                    <div className="py-2 text-uppercase">Status</div>
                  </th>
                  <th scope="col" className="border-0 bg-light text-center">
                    <div className="py-2 text-uppercase">Detail</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <th scope="row" className="border-0">
                      <div className="p-2">
                        <div className="mx-3 d-inline-block align-middle">
                          <h5 className="mb-0">
                            <span className="text-dark d-inline-block align-middle">
                              {order.name}
                            </span>
                          </h5>
                        </div>
                      </div>
                    </th>
                    <td className="border-0 align-middle text-center">
                      <strong>{order.phone}</strong>
                    </td>
                    <td className="border-0 align-middle text-center">
                      <strong>
                        {new Intl.NumberFormat("it-IT", configMoney).format(
                          order?.total
                        )}
                      </strong>
                    </td>
                    <td className="border-0 align-middle text-center">
                      <strong>{order.status}</strong>
                    </td>
                    <td className="border-0 align-middle text-center">
                      <Link to={`/order/${order._id}`} className={classes.view}>
                        View Detail
                      </Link>
                    </td>
                  </tr>
                ))}
                {orders.length < 1 && (
                  <tr>
                    <td
                      style={{ color: "#8CB9BD" }}
                      colSpan="5"
                      className="text-center w-100 fs-3"
                    >
                      No Order!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </Container>
    </>
  );
}

export default OrderPage;
