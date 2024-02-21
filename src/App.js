import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import PetsPage from "./pages/PetsPage/PetsPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import OrderDetailPage from "./pages/OrderDetailPage/OrderDetailPage";
import Protect from "./components/Protect/Protect";
import DashBoard from "./admin/Dashboard/Dashboard";
import Pets from "./admin/pages/pets/Pets";
import Users from "./admin/pages/users/Users";
import { ToastContainer } from "react-toastify";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="pets" element={<PetsPage />}></Route>
          <Route path="blog" element={<BlogPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route path="cart" element={<CartPage />}></Route>
          <Route path="checkout" element={<CheckoutPage />}></Route>
          <Route
            path="order"
            element={
              <Protect>
                <OrderPage />
              </Protect>
            }
          ></Route>
          <Route
            path="order/:id"
            element={
              <Protect>
                <OrderDetailPage />
              </Protect>
            }
          ></Route>
        </Route>
        <Route path="/admin" element={<DashBoard />}>
          <Route path="pets" element={<Pets />}></Route>
          <Route path="users" element={<Users />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
