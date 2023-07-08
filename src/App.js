import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { capitalizeFirstLetter } from './helpers/Helpers';
// import PokemonCard from './components/PokemonCards';
import PokemonList from './components/PokemonList';

const App = () => {

    return (
      <div>
        <h1>Pokedex</h1>
        <div>
          <PokemonList />
        </div>
      </div>
    );
  }


export default App;
