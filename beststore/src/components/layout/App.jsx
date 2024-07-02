import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Contact from "../../pages/Contact";
import NotFound from "../../pages/NotFound";
import ProductList from "../../pages/admin/products/ProductList";
import CreateProduct from "../../pages/admin/products/CreateProduct";
import EditProduct from "../../pages/admin/products/EditProduct";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/products/create" element={<CreateProduct />} />
        <Route path="/admin/products/edit/:id" element={<EditProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
