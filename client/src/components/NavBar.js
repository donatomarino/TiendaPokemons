import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const style = {
    textDecoration: "none",
    margin: '30px',
    color: '#FF0000',
    fontSize: '25px',
    fontWeight: '700px'
  }
  return (
    <nav>
      <Link style={style} to="/">Catalog Products</Link>
      <Link style={style} to="/cart">Cart</Link>
    </nav>
  );
}