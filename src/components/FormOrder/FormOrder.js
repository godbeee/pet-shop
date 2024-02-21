import { useState } from "react";
import classes from "./FormOrder.module.css";
import { useSelector, useDispatch } from "react-redux";
import { baseURL } from "../../config/config";
import { toast } from "react-toastify";
import { cartAction } from "../../store/slices/cartSlice";

function FormOrder() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user.data);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [user, setUser] = useState(state);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const cartTransform = cartItems?.map((item) => {
      return {
        petId: item._id,
        quantity: item.quantity,
      };
    });
    const summaryOrder = {
      userInfo: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        note: e.target.elements.note.value,
        address: e.target.elements.address.value,
      },
      buyedPets: {
        pets: cartTransform,
        petsOrigin: cartItems,
        totalPrice,
      },
    };
    console.log(summaryOrder);
    const res = await fetch(`${baseURL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(summaryOrder),
    });

    const data = await res.json();

    if (data.errors.length) {
      notify(data.errors[0].msg, true);
      return;
    }
    dispatch(cartAction.clearCart());
    notify("order success!", false);
    let url = "/";
    if (state.email) {
      url = "/order";
    }
    setTimeout(() => {
      window.location.href = url;
    }, 1000);
  }
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
  return (
    <>
      <h3>Info Customer</h3>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className="col-md-10 my-2">
          <label className="form-label">Fullname</label>
          <input
            onChange={handleChange}
            value={user?.fullname}
            type="text"
            className="form-control"
            name="fullname"
          />
        </div>
        <div className="col-md-10 my-2">
          <label className="form-label">Phone</label>
          <input
            onChange={handleChange}
            type="tel"
            className="form-control"
            name="phone"
            value={user?.phone}
          />
        </div>
        <div className="col-md-10 my-2">
          <label className="form-label">Email</label>
          <input
            onChange={handleChange}
            type="email"
            className="form-control"
            name="email"
            value={user?.email}
          />
        </div>
        <div className="col-md-10 my-2">
          <label className="form-label">note</label>
          <input type="text" className="form-control" name="note" />
        </div>
        <div className="col-md-10 my-2">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" name="address" />
        </div>
        <div className="col-md-10 d-flex justify-content-end">
          <button type="submit" className="btn btn-success w-100">
            Place order
          </button>
        </div>
      </form>
    </>
  );
}

export default FormOrder;
