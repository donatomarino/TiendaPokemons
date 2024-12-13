import { useState, useEffect } from "react";

const useFetch = ( ) => {
  const [searchData, setSearchData] = useState([]);
  const [pokemon, setPokemon] = useState("pikachu");


  // Recoge la info del pokemon (predeterminado está "Pikachu")
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setSearchData([res])
      })
  }, [pokemon]);

  return [setPokemon, searchData];
};

export default useFetch;
