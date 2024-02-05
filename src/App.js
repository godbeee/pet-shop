import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import PetsPage from "./pages/PetsPage/PetsPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
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
          <Route path="cart" element={<CartPage />}></Route>
          <Route path="checkout" element={<CheckoutPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
