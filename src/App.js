import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { capitalizeFirstLetter } from './helpers/Helpers';
// import PokemonCard from './components/PokemonCards';

const App = () => {
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [loading, setLoading] = useState(true);

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
    // axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemon}`)

    // Temporary solution to get the list of pokemon from the database.
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1010`)
    .then(response => {
      setPokemonList(response.data.results);
    })
    .catch(error => {
      console.log(error);
    });
  }, [totalPokemon]);

  useEffect(() => {
    // Create an array to hold all the axios requests
    const requests = pokemonList.map(pokemon => {
      return axios.get(pokemon.url);
    });
  
    // Send all the axios requests at once using Promise.all()
    Promise.all(requests)
    .then(responses => {
      // Map through the responses and extract the relevant data
      const pokemonData = responses.map(response => {
        return {
          data: response.data,
          id: response.data.id,
          name: response.data.name,
          baseExperience: response.data.base_experience,
          order: response.data.order,
          isDefault: response.data.is_default,
          height: response.data.height,
          weight: response.data.weight,
          abilities: response.data.abilities.map(ability => {
            return {
              name: ability.ability.name,
              url: ability.ability.url
            };
          }),
          forms: response.data.forms.map(form => form.name),
          gameIndices: response.data.game_indices.map(index => index.version.name),
          locationAreaEncounters: response.data.location_area_encounters,
          moves: response.data.moves.map(move => move.move.name),
          sprites: {
            front: response.data.sprites.front_default,
            back: response.data.sprites.back_default,
            frontShiny: response.data.sprites.front_shiny,
            backShiny: response.data.sprites.back_shiny
          },
          species: {
            name: response.data.species.name,
            url: response.data.species.url
          },
          stats: response.data.stats.map(stat => {
            return {
              name: stat.stat.name,
              value: stat.base_stat
            };
          }),
          types: response.data.types.map(type => {
            return {
              name: type.type.name,
              url: type.type.url
            };
          })
        };
      });

      // Update the state with the pokemon data
      setPokemonDetails(pokemonData);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    })
    .catch(error => {
      console.log(error);
    });
    }, [pokemonList]);

  console.log("Data in list", pokemonDetails);

    return (
      <div>
        <h1>Pokedex</h1>
        <div>
          {loading ? <div>Loading...</div>: pokemonDetails && pokemonDetails.map((pokemon, i ) => <div key={i}>{capitalizeFirstLetter(pokemon.name)}</div>)}
        </div>
      </div>
    );
  }


export default App;
