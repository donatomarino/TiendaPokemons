import { Link } from "react-router-dom";
import { toUpper } from "../pages/Home";
import Boton from "../components/Boton";
import { useEffect, useState } from "react";

export default function ProductsCart({ prod, precio, quantity }) {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')));
    }, [])

    // ELiminamos los productos y actualizamos el localStorage
    const deleteBuy = (index) => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));

        // Filtramos en el carrito para eliminar el item en el índice dado
        const updateCart = storedCart.filter((_, i) => i != index);

        // Actualizamos estado del carrito
        setCart(updateCart);

        // Si el carrito está vacío se elimina la clave 'cart' del localStorage
        if (updateCart == 0) {
            localStorage.removeItem('cart');
        } else {
            localStorage.setItem('cart', JSON.stringify(updateCart));
        }

    };


    // Calculamos el total del carrito
    const countingTotal = () => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const allPrices = [];

        if (cart) {
            cart.map((e) => {
                // Calculamos el precio por la cantidad de productos que tenemos
                const total = e.price * e.quantity;
                allPrices.push(total)
            })
            const suma = allPrices.reduce((accumulador, currentValue) => accumulador + currentValue);
            localStorage.setItem('buy', JSON.stringify(suma));
            return suma;
        } else {
            return "";
        }
    };

    // Disminuimos la cantidad de un producto
    const removeItem = (i) => {
        const updatedCart = cart.map((e, index) => {
            if (index === i) {
                return { ...e, quantity: e.quantity - 1 };
            }
            return e;
        });

        setCart(updatedCart); // Actualiza el estado con el nuevo array
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Guarda el estado actualizado en localStorage
    };

    // Aumentamos la cantidad
    const addItem = (i) => {
        cart.forEach((e, index) => {
            if (index === i) {
                e.quantity += 1;
            }
        });
        setCart([...cart]);
        localStorage.setItem('cart', JSON.stringify(cart))
    };

    return (
        <div className="container-table">
            {localStorage.getItem('cart')
                ? (
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope='col'>NOMBRE</th>
                                    <th scope='col'>PRECIO</th>
                                    <th scope='col'>CANTIDAD</th>
                                    <th scope='col'>ELIMINAR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((item, index) => (
                                        <tr>
                                            <th>{toUpper(item.name)}</th>
                                            <td>€{item.price}</td>
                                            <td>
                                                {item.quantity > 1 ? (
                                                    <Boton
                                                        clase={"btn btn-ouline-primary"}
                                                        text={"-"}
                                                        onClick={() => removeItem(index)}
                                                    />
                                                ) : (
                                                    <Boton
                                                        clase={"btn btn-ouline-primary"}
                                                        text={"-"}
                                                        onClick={() => { deleteBuy(index) }}
                                                    />)
                                                }
                                                <Boton
                                                    clase={"btn btn-warning"}
                                                    text={item.quantity}
                                                />
                                                <Boton
                                                    clase={"btn btn-ouline-primary"}
                                                    text={"+"}
                                                    onClick={() => addItem(index)}
                                                />
                                            </td>
                                            <td>
                                                <Boton
                                                    value={index}
                                                    clase={"btn btn-danger"}
                                                    text={"Eliminar"}
                                                    onClick={() => { deleteBuy(index) }}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }

                                <th>TOTAL: </th>
                                <td></td>
                                <td></td>
                                <td>€{countingTotal()}</td>
                            </tbody>

                        </table>

                        <div className="btn-checkout">
                            <Link to="/checkout">
                                <Boton
                                    clase="btn-compra"
                                    text={"COMPRAR"}
                                //disabled
                                />
                            </Link>
                        </div>

                    </>
                ) : (
                    <div className="cart-empty">
                        <h2 className="cart-empty_title">TU CARRITO ESTÁ VACÍO</h2>
                        <p className="cart-empty_p">Cuando hayas añadido algo al carrito, aparecerá aquí. ¿Quieres empezar?</p>
                        <Link to="/"><button type="button" class="btn btn-primary btn-lg">Vamos a comprar!</button></Link>
                    </div>
                )}
        </div>
    );
}