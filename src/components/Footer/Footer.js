import classes from "./Footer.module.css";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <div className={classes.container}>
        <div className={classes["social-icons"]}>
          <FaFacebook className={classes.icon} />
          <FaGithub className={classes.icon} />
          <FaInstagram className={classes.icon} />
        </div>
        <div>
          <p style={{ textAlign: "center" }}>
            &copy; {year} petshop.onrender.com
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
