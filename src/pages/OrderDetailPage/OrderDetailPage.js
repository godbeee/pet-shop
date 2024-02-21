import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseURL, configMoney } from "../../config/config";
import { Container } from "react-bootstrap";
import Card from "../../components/UI/Card";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import classes from "./OrderDetailPage.module.css";

function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id;
  const [order, setOrder] = useState(null);

  console.log(order);

  useEffect(() => {
    async function fetchOrder() {
      const res = await fetch(`${baseURL}/orders/${orderId}`);
      const data = await res.json();
      setOrder(data.order);
    }
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);
  return (
    <>
      <Container style={{ marginTop: "4rem", marginBottom: "6rem" }}>
        <div className={classes.banner}>
          <div>
            <nav className="breadcrumbs">
              <Link to="/" className="breadcrumbs__item">
                Home
              </Link>
              <Link to="/order" className="breadcrumbs__item">
                Oder
              </Link>
              <Link to="/order" className="breadcrumbs__item is-active">
                Oder Detail
              </Link>
            </nav>
          </div>
        </div>
        <Card className={"mb-5 p-1"}>
          <h3 className="text-center my-3">Order Detail!</h3>
          <div className="row">
            <div className="col-md-6">
              <Card className={"p-3"}>
                <div className="row my-2">
                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <FaRegUser style={{ marginRight: "4px" }} />
                      <strong>Name: {order?.name}</strong>
                    </div>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center">
                      <MdOutlinePhoneIphone style={{ marginRight: "4px" }} />
                      <strong>Phone: {order?.phone}</strong>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center">
                      <MdOutlineEmail style={{ marginRight: "4px" }} />
                      <strong>Email: {order?.email}</strong>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    style={{ borderTop: "1px solid black" }}
                    className="col-12 py-3"
                  >
                    <div className="d-flex align-items-center">
                      <FaRegAddressBook style={{ marginRight: "4px" }} />
                      <strong>Address: {order?.address}</strong>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-md-6">
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
                    {order?.buyPets.map((ci) => (
                      <tr key={ci._id}>
                        <th scope="row" className="border-0">
                          <div className="p-2">
                            {!ci.petId.avatar && (
                              <img
                                src="https://placehold.co/220x138?text=Empty"
                                alt="empty"
                                width="70"
                                className="img-fluid rounded shadow-sm"
                              />
                            )}
                            {ci.petId.avatar && (
                              <img
                                src={ci?.petId?.avatar?.url}
                                alt={ci?.petId?.name}
                                width="70"
                                className="img-fluid rounded shadow-sm"
                              />
                            )}
                            <div className="mx-3 d-inline-block align-middle">
                              <h5 className="mb-0">
                                <span className="text-dark d-inline-block align-middle">
                                  {ci.petId.name}
                                </span>
                              </h5>
                              <span className="text-muted font-weight-normal font-italic d-block">
                                Type: {ci.petId.type}
                              </span>
                            </div>
                          </div>
                        </th>

                        <td className="border-0 align-middle text-center">
                          <strong>x{ci.quantity}</strong>
                        </td>
                        <td className="border-0 align-middle text-center">
                          <strong>
                            {new Intl.NumberFormat("it-IT", configMoney).format(
                              ci?.petId?.price
                            )}
                          </strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr></hr>
                <div className="d-flex justify-content-end">
                  <p>
                    <strong>
                      Total Price:{" "}
                      {new Intl.NumberFormat("it-IT", configMoney).format(
                        order?.total
                      )}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
}

export default OrderDetailPage;
