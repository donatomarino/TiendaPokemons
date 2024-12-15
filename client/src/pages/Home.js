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

    // Recogemos todos los pokemons y creamos las cartas
    useEffect(() => {
        const storedPokemons = localStorage.getItem('pokemons');

        if (storedPokemons) {
            // Si hay pokemons almacenados se guardan en el LocalStorage
            setAllPokemon(JSON.parse(storedPokemons));
        } else {
            const getFetch = async () => {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=20&limit=10`);
                    const data = await response.json()
                    return data.results;
                } catch(e){
                    console.log(`Error: ${e}`);
                    return []
                }
            }

            const allPokemons = async () => {
                try {
                    const response = await getFetch();
                    const pokemons = await Promise.all(response.map(async (r) => {
                        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${r.name}`);
                        const d = await res.json();
                        return {
                            name: d.name,
                            image: d.sprites.other.home.front_default
                        };    
                    }))
                    setAllPokemon(pokemons);
                    localStorage.setItem('pokemons', JSON.stringify(pokemons))
                } catch (e) {
                    console.log(`Error: ${e}`);
                    return [];
                }
            }
            allPokemons()
        }
    }, []);

    const handleAddToCart = (info) => {
        /* Por el momento no sirve
        setCart([...cart, [info[0], info[1]]]);
        */

        let product = {
            name: info[0],
            price: info[1],
            quantity: 1
        }

        // Buscamos el elemento 'cart' en el localStorage
        let carrito = localStorage.getItem('cart');

        // Si existe lo parsea a object sino crea un array vacío
        carrito ? carrito = JSON.parse(carrito) : carrito = [];

        // Verificamos si el producto ya está en el carrito, si está cogemos la index para sumar la cantidad
        const existingIndex = carrito.findIndex(item => item.name === product.name);

        // Si ya existe sumamos 1 a la cantidad, si no lo añadimos al array
        if(existingIndex !== -1) {
            carrito[existingIndex].quantity++;
        } else {
            carrito.push(product);
        }

        // Settamos elemento en el localStorage
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