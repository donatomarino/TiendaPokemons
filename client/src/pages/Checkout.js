import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Boton from "../components/Boton";
import { toUpper } from "../pages/Home";

export default function Checkout() {
    const [totalBuy, setTotalBuy] = useState();
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        setPokemons(JSON.parse(localStorage.getItem('cart')))
        setTotalBuy(localStorage.getItem('buy'));
    }, [])

    const clearLocalStorage = () => {
        // Remove los items del carrito actual
        localStorage.removeItem('cart');
        localStorage.removeItem('buy');
    }

    return (
        <div className="contenedor-checkout">
            <h2 className="cart-empty_title">¡Compra Realizada con Éxito!</h2>
            <h4 className="cart-empty_p">
                Pokemon comprados:
                {pokemons.map((e) => (
                    <li>{toUpper(e.name)} x {e.quantity}</li>
                ))}
            </h4>
            <h4 className="cart-empty_p">Total gastado: {totalBuy}€</h4>
            <Link to="/">
                <Boton
                    clase="btn-compra"
                    text={"VOLVER A LA HOME"}
                    onClick={() => clearLocalStorage()}
                />
            </Link>
        </div>
    )
}