import React from "react";
import { useEffect, useState } from "react";
import Product from "../components/Product";
// import fetch from "../hooks/fetch";

// Devolvemos la primera letra del nombre en mayuscula
export const toUpper = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function Home() {
    const [allPokemon, setAllPokemon] = useState([]);

    const [cart, setCart] = useState([]);

    // Para recoger todos los pokemons y crear cartas
    useEffect(() => {
        const storedPokemons = localStorage.getItem('pokemons');

        if (storedPokemons) {
            // Si hay pokemons almacenados se guardan en el LocalStorage
            setAllPokemon(JSON.parse(storedPokemons));
        } else {
            const getFetch = async () => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=20&limit=10`);
                const data = await response.json()
                return data;
            }

            const allPokemons = async () => {
                const response = await getFetch();
                const pokemons = await Promise.all(response.results.map(async (r) => {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${r.name}`);
                    const d = await res.json();
                    return {
                        name: d.name,
                        image: d.sprites.other.home.front_default,
                    };

                }))
                setAllPokemon(pokemons);
                localStorage.setItem('pokemons', JSON.stringify(pokemons))
            }
            allPokemons()
        }
    }, []);

    const handleAddToCart = (info) => {
        setCart([...cart, [info[0], info[1]]]);

        let product = {
            name: info[0],
            url: info[1]
        }

        let carrito = localStorage.getItem('cart');

        carrito ? carrito = JSON.parse(carrito) : carrito = [];

        carrito.push(product);

        // console.log(product)
        localStorage.setItem('cart', JSON.stringify(carrito))

        alert(`Pokemon ${toUpper(info[0])} añadido al carrito!`);
    };

    return (
        <div className="main">
            <h2 id="title-main">Catalogo de Productos</h2>
            <div className="container-productos">
                {allPokemon
                    ? allPokemon.map((pokemon) => {
                        return (
                            <Product
                                url={pokemon.image}
                                up={toUpper}
                                name={pokemon.name}
                                addToCart={handleAddToCart}
                            />
                        )
                    })
                    : ""}
            </div>
        </div>
    );
}