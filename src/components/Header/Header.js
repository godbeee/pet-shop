import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../assets/logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";

function Header() {
  const navigate = useNavigate();

  function handleNavigate(path) {
    navigate(path);
  }
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to={"/"} className={classes.branch}>
            <img height={40} src={logo} alt="logo" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/admin">
                admin
              </NavLink>
              <NavLink className="nav-link spec" to="/pets">
                pets
              </NavLink>
              <NavLink className="nav-link" to="/blog">
                blog
              </NavLink>
            </Nav>
            <Nav>
              <NavLink className={`nav-link ${classes.cart}`} to="/cart">
                <FaShoppingCart className={classes.icon} /> <span>cart</span>
                <span className={classes.amount}>0</span>
              </NavLink>
              <button
                onClick={() => handleNavigate("/login")}
                className={classes.btn}
              >
                login
              </button>
              <button
                onClick={() => handleNavigate("/register")}
                className={classes.btn}
              >
                register
              </button>
              {/* <NavDropdown title="user" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">logout</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Nav
        style={{ backgroundColor: "#E5E1DA" }}
        className="justify-content-center mb-2"
      >
        <Link
          className={`${classes["sub-link"]} nav-link text-secondary`}
          to="/"
        >
          dogs
        </Link>
        <Link
          className={`${classes["sub-link"]} nav-link text-secondary`}
          to="/"
        >
          cats
        </Link>
        <Link
          className={`${classes["sub-link"]} nav-link text-secondary`}
          to="/"
        >
          other
        </Link>
      </Nav>
    </>
  );
}

export default Header;
