import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Boton from "../components/Boton";

export default function Checkout() {
    const [totalBuy, setTotalBuy] = useState();
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        setPokemons(JSON.parse(localStorage.getItem('cart')))
        setTotalBuy(localStorage.getItem('buy'));
    }, [])

    const removeCart = () => {
        // Remove los items del carrito actual
        localStorage.removeItem('cart');
    }

    const toUpper = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return (
        <div className="contenedor-checkout">
            <h2>¡Compra Realizada con Éxito!</h2>
            <h4>
                Pokemon comprados:
                {pokemons.map((e) => (
                    <li>{toUpper(e.name)} x {e.quantity}</li>
                ))}
            </h4>
            <h4>Total gastado: {totalBuy}€</h4>
            <Link to="/">
                <Boton
                    clase="btn-compra"
                    text={"VOLVER A LA HOME"}
                    onClick={() => removeCart()}
                />
            </Link>
        </div>
    )
}