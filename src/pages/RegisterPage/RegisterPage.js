import { useNavigate } from "react-router-dom";
import classes from "./RegisterPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import { baseURL } from "../../config/config";

function RegisterPage() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      fullname: e.target.elements.fullname.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      phone: e.target.elements.phone.value,
    };
    const res = await fetch(`${baseURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    if (data.errors.length) {
      notify(data.errors[0].msg, true);
      return;
    }
    e.target.reset();
    notify("create user success!");
    return setTimeout(() => {
      navigate("/login");
    }, 1500);
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
      <div className={classes.container}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <h2>Sign up</h2>
          <div className={classes["form-control"]}>
            <label>fullname:</label>
            <input name="fullname" />
          </div>
          <div className={classes["form-control"]}>
            <label>email:</label>
            <input type="email" name="email" />
          </div>
          <div className={classes["form-control"]}>
            <label>password:</label>
            <input type="password" name="password" />
          </div>
          <div className={classes["form-control"]}>
            <label>phone:</label>
            <input type="tel" name="phone" />
          </div>
          <div className={classes["form-control"]}>
            <button className="btn btn-secondary">Register</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default RegisterPage;
