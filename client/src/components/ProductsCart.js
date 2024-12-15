// Un componente que representa un solo producto
import { Link } from "react-router-dom";
import { toUpper } from "../pages/Home";
import Boton from "../components/Boton";
import { useEffect, useState } from "react";

export default function ProductsCart({ prod, precio, quantity }) {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')));
        // localStorage.setItem('cart', JSON.stringify(cart));
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
            return suma;
        } else {
            return "";
        }
    };

    return (
        <div className="container-table">
            {prod
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
                                                <Boton
                                                    clase={"btn btn-ouline-primary"}
                                                    text={"-"}
                                                />
                                                <Boton
                                                    clase={"btn btn-warning"}
                                                    text= {item.quantity}
                                                />
                                                <Boton
                                                    clase={"btn btn-ouline-primary"}
                                                    text={"+"}
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

                        <div className="d-grid gap-2">
                            <Boton
                                clase="btn-compra"
                                text={"COMPRAR"}
                            //disabled
                            />
                        </div>

                    </>
                ) : (
                    <div className="cart-empty">
                        <h2 className="cart-empty_title">TU CARRITO ESTÁ VACÍO</h2>
                        <p className="cart-empty_p">Cuando hayas añadido algo al carrito, aparecerá aquí. ¿Quieres empezar?</p>
                        <Link to="/"><button type="button" class="btn btn-primary btn-lg">Vamos a comprar!</button></Link>
                    </div>
                )
            }
        </div>
    );
}