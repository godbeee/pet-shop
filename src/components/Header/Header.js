import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../store/slices/userSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart.cartItems);

  function handleNavigate(path) {
    navigate(path);
  }

  function handleLogout(e) {
    e.preventDefault();
    dispatch(userAction.onLogout());
  }
  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary fixed-top">
        <Container>
          <Link to={"/"} className={classes.branch}>
            <img height={40} src={logo} alt="logo" />
          </Link>
          <NavLink
            className={`${classes.test} d-flex align-items-center text-decoration-none text-black fs-5`}
            to="/cart"
          >
            <FaShoppingCart className="mx-2" />
            <span className="position-relative">
              Cart
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-13px",
                  color: "#d04848",
                }}
              >
                {cart.length}
              </span>
            </span>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/admin/dashboard">
                Admin
              </NavLink>
              <NavLink className="nav-link spec" to="/pets">
                Pets
              </NavLink>
            </Nav>
            <Nav>
              <NavLink className={`nav-link ${classes.cart}`} to="/cart">
                <FaShoppingCart className={classes.icon} /> <span>cart</span>
                <span className={classes.amount}>{cart.length}</span>
              </NavLink>
              {!state.isAuth && (
                <>
                  <button
                    onClick={() => handleNavigate("/login")}
                    className={classes.btn}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigate("/register")}
                    className={classes.btn}
                  >
                    Register
                  </button>
                </>
              )}
              {state.isAuth && (
                <NavDropdown title={state.fullname} id="basic-nav-dropdown">
                  <Link className="dropdown-item" to="/order">
                    <FaFile /> orders
                  </Link>
                  <NavDropdown.Divider />
                  <Link onClick={handleLogout} className="dropdown-item" to="/">
                    <FaArrowRight /> logout
                  </Link>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
