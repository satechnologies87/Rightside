import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import About from "./pages/about/About.jsx";
import Products from "./pages/products/Products.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}