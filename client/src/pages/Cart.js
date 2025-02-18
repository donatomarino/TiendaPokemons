import ProductsCart from "../components/ProductsCart";

const Cart = () => {
  const productos = JSON.parse(localStorage.getItem('cart'));

  return (
    <ProductsCart
      prod={productos}
    />
  );
}

export default Cart;