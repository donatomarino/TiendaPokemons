import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar"
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";


function App() {
  return (
    <Router>
      <div className="container-header">
        <Header />
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <div className="ftr">
      <Footer />
      </div>
    </Router>
  );
}

export default App;
