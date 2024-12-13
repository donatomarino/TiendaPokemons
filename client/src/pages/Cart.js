import React, { useState } from "react";
import ProductsCart from "../components/ProductsCart";

const Cart = () => {
  const productos = JSON.parse(localStorage.getItem('cart'));

  return (
    <ProductsCart
      prod={productos}
      quantity="0"
    />
  );
}

export default Cart;