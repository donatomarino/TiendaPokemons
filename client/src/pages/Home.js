import React from "react";
import { useEffect, useState } from "react";
import Product from "../components/Product";
// import fetch from "../hooks/fetch";

export default function Home() {
    const [allPokemon, setAllPokemon] = useState([]);

    const [cart, setCart] = useState([]);

    // Para recoger todos los pokemons y crear sus botones
    useEffect(() => {
        const storedPokemons = localStorage.getItem('pokemons');

        if (storedPokemons) {
            // Si hay pokemons almacenados, usarlos
            setAllPokemon(JSON.parse(storedPokemons));
        } else {
            // Si no hay pokemons almacenados, hacer fetch y almacenarlos
            fetch(`https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20`)
                .then((res) => res.json())
                .then((res) => {
                    let pokemons = [];

                    res.results.map((r) =>
                        fetch(`https://pokeapi.co/api/v2/pokemon/${r.name}`)
                            .then((data) => data.json())
                            .then((data) => {
                                pokemons.push({
                                    name: data.name,
                                    image: data.sprites.other.home.front_default,
                                });
                            })
                            .catch(e => console.log(e))
                    ).then(() => {
                        // Al finalizar todas las peticiones, guardar los pokemons en localStorage
                        setAllPokemon(pokemons);
                        localStorage.setItem('pokemons', JSON.stringify(pokemons));
                    });
                })
                .catch((e) => console.log(e));

            console.log(allPokemon)
        }
    }, []);


    // Devolvemos la primera letra del nombre en mayuscula
    const toUpper = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
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