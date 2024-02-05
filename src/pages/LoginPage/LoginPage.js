import { Link } from "react-router-dom";
import classes from "./LoginPage.module.css";

function LoginPage() {
  return (
    <>
      <div className={classes.container}>
        <form className={classes.form}>
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
            <button className="btn btn-secondary">login</button>
          </div>
          <div>
            <Link>forget password</Link>
            <Link>register.</Link>
          </div>
          <hr></hr>
          <p style={{ textAlign: "center" }}>or login with</p>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
