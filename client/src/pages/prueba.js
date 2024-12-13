    useEffect(() => {
        const storedPokemons = localStorage.getItem('pokemons');

        if (storedPokemons) {
            // Si hay pokemons almacenados
            setAllPokemon(JSON.parse(storedPokemons));
        } else {
            console.log('hola')
            // Si no hay pokemons almacenados, hacer fetch y almacenarlos
            fetch(`https://pokeapi.co/api/v2/pokemon/?offset=20&limit=10`)
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
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
                        // Guardamos los pokemons en localStorage
                        localStorage.setItem('pokemons', JSON.stringify(pokemons));
                        setAllPokemon(pokemons);
                        // console.log(pokemons)
                    });
                })
                .catch((e) => console.log(e));
        }
    }, []);