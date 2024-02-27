import { Modal } from "react-bootstrap";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { configMoney, baseURL } from "../../../../../config/config";
import { useEffect, useState } from "react";

function ModalViewOrder({ order, show, handleClose, fetchOrders }) {
  const [status, setStatus] = useState(order?.status);
  const [note, setNote] = useState(order?.note);

  useEffect(() => {
    setNote(order?.note);
    setStatus(order?.status);
  }, [order?.note, order?.status]);

  async function handleUpdate(e) {
    e.preventDefault();
    const obj = {
      status: e.target.elements.status.value,
      note: e.target.elements.note.value,
    };
    if (order._id) {
      const res = await fetch(`${baseURL}/admin/orders/${order._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      await res.json();
      handleClose();
      fetchOrders();
    }
  }
  function handleChange(e) {
    setStatus(e.target.value);
  }
  function handleChangeNote(e) {
    setNote(e.target.value);
  }
  return (
    <>
      <div>
        <Modal
          size="xl"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Detail order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleUpdate} className="g-3">
              <div className="row">
                <div className="col-md-12 col-lg-7">
                  <div className={"p-3"}>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex align-items-center">
                          <FaRegUser style={{ marginRight: "4px" }} />
                          <strong>Name: {order?.name}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-md-12 col-lg-6">
                        <div className="d-flex align-items-center">
                          <MdOutlinePhoneIphone
                            style={{ marginRight: "4px" }}
                          />
                          <strong>Phone: {order?.phone}</strong>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
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
                    <div className="row">
                      <select
                        defaultValue={status}
                        onChange={handleChange}
                        name="status"
                        className="form-control w-50 my-2"
                      >
                        <option value={"waiting for pay"}>
                          Waiting for pay
                        </option>
                        <option value={"already paid"}>Already paid</option>
                        <option value={"delivery"}>Delivery</option>
                        <option value={"delivered"}>Delivered</option>
                        <option value={"cancel"}>Cancel</option>
                      </select>
                      <textarea
                        name="note"
                        onChange={handleChangeNote}
                        className="form-control"
                        placeholder="note..."
                        value={note}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-5">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="border-0 bg-light">
                            <div className="p-2 px-3 text-uppercase">Name</div>
                          </th>
                          <th
                            scope="col"
                            className="border-0 bg-light text-center"
                          >
                            <div className="py-2 text-uppercase">Quantity</div>
                          </th>
                          <th
                            scope="col"
                            className="border-0 bg-light text-center"
                          >
                            <div className="py-2 text-uppercase">Price</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {order?.buyPets.map((ci) => (
                          <tr key={ci._id}>
                            <th scope="row" className="border-0">
                              <div className="p-2">
                                {!ci.petId?.avatar && (
                                  <img
                                    src="https://placehold.co/220x138?text=Empty"
                                    alt="empty"
                                    width="70"
                                    className="img-fluid rounded shadow-sm"
                                  />
                                )}
                                {ci.petId?.avatar && (
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
                                      {ci.petId?.name}
                                    </span>
                                  </h5>
                                  <span className="text-muted font-weight-normal font-italic d-block">
                                    Type: {ci.petId?.type}
                                  </span>
                                </div>
                              </div>
                            </th>

                            <td className="border-0 align-middle text-center">
                              <strong>x{ci.quantity}</strong>
                            </td>
                            <td className="border-0 align-middle text-center">
                              <strong>
                                {new Intl.NumberFormat(
                                  "it-IT",
                                  configMoney
                                ).format(ci?.petId?.price)}
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
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary w-25">Update</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default ModalViewOrder;
