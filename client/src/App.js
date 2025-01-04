import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation(); // Obtén la ubicación actual

  return (
    <>
      <div className="container-header">
        <Header />
        {/* En la ruta "/checkout" no sale el NavBar */}
        {location.pathname !== "/checkout" && <NavBar />}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <div className="ftr">
        <Footer />
      </div>
    </>
  );
}

export default App;
