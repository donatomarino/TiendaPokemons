import React from "react";
import { useEffect, useState } from "react";
import Product from "../components/Product";
// import fetch from "../hooks/fetch";

export default function Home() {
    const [allPokemon, setAllPokemon] = useState([]);

    const [cart, setCart] = useState([]);

    // Para recoger todos los pokemons y crear cartas
    useEffect(() => {
        const storedPokemons = localStorage.getItem('pokemons');

        if (storedPokemons) {
            // Si hay pokemons almacenados
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


    // Devolvemos la primera letra del nombre en mayuscula
    const toUpper = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    const handleAddToCart = (info) => {
        setCart([...cart, [info[0], info[1]]]);
    };

    useEffect(() => {
        let carrito = localStorage.getItem('cart');

        if (carrito) {
            carrito = JSON.parse(carrito);
        } else {
            carrito = [];
        }

        // console.log(cart);
        // console.log(cart[0].name)
        cart.map((e) => {
            let product = {
                name: e[0],
                url: e[1]
            }

            carrito.push(product);
        })
        // console.log(product)
        localStorage.setItem('cart', JSON.stringify(carrito))
    }, [cart])

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