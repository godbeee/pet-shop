import classes from "./Orders.module.css";
import { useState, useEffect } from "react";
import Card from "../../../components/UI/Card";
import { debounce } from "../../../utils/ultils";
import { baseURL, pageSize } from "../../../config/config";
import OrderTable from "./components/OrderTable/OrderTable";
import ReactPaginate from "react-paginate";
import ModalViewOrder from "./components/ModalViewOrder/ModalViewOrder";

function Orders() {
  //orders
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState(null);
  //view modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //paginate
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + pageSize;
  const currentOrders = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / pageSize);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * pageSize) % orders.length;
    setItemOffset(newOffset);
  };
  //search
  const [fullname, setFullname] = useState("");
  const handleOnChange = debounce((value) => {
    setFullname(value);
  });
  ///////////////////////////////////////
  useEffect(() => {
    fetchOrders(fullname);
  }, [fullname]);
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

  async function fetchOrders(fullname = "") {
    let api = `${baseURL}/admin/orders`;
    if (fullname) {
      api = `${baseURL}/admin/orders?fullname=${fullname}`;
    }
    const res = await fetch(api);
    const data = await res.json();
    setOrders(data.orders);
  }

  return (
    <>
      <div className="p-3">
        <Card className={"p-4"}>
          <div className={classes.head}>
            <h3>Orders management</h3>
            <ModalViewOrder
              order={order}
              show={show}
              handleClose={handleClose}
              fetchOrders={fetchOrders}
            />
          </div>
        </Card>
        <Card className={"p-4 mt-3"}>
          <div className="mb-3 d-flex justify-content-end align-items-center">
            <form>
              <input
                onChange={(e) => handleOnChange(e.target.value)}
                className="form-control"
                placeholder="Enter search here"
              />
            </form>
          </div>
          <OrderTable
            handleShow={handleShow}
            setOrderId={setOrderId}
            orders={currentOrders}
            fetchOrders={fetchOrders}
          />

          <ReactPaginate
            className={classes.paginate}
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </Card>
      </div>
    </>
  );
}

export default Orders;
