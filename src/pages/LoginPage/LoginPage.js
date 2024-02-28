import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./LoginPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import { baseURL } from "../../config/config";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/slices/userSlice";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    const res = await fetch(`${baseURL}/login`, {
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
    dispatch(userAction.onLogin(data.user));
    e.target.reset();
    notify("login user success!");
    return setTimeout(() => {
      navigate(from, { replace: true });
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
          <h2>Login</h2>
          <div className={classes["form-control"]}>
            <label>email</label>
            <input type="email" name="email" />
          </div>
          <div className={classes["form-control"]}>
            <label>password</label>
            <input type="password" name="password" />
          </div>
          <div className={classes["form-control"]}>
            <button className="btn btn-secondary">Login</button>
          </div>
          <div>
            <Link to={"/register"}>
              dont have account ?{" "}
              <span
                style={{
                  color: "cadetblue",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  fontSize: "1.2rem",
                }}
              >
                register
              </span>
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginPage;
