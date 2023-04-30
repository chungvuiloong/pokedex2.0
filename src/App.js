import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCards';

const App = () => {
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);

  // This useEffect is used to get the total number of pokemon in the database.
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon`)
      .then(response => {
        setTotalPokemon(response.data.count);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // This useEffect is used to get the list of pokemon from the database.
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemon}`)
      .then(response => {
        setPokemonList(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [totalPokemon]);

  console.log(pokemonList);
  return (
    <div>
      <h1>Pokedex</h1>
      {/* <PokemonCard
        name={pokemon.name}
      /> */}
  
        {/* {pokemonList && pokemonList.map(pokemon => (
        <div key={pokemon.name}>{pokemon.name}</div>
        ))} */}

    </div>
  );
};

export default App;
