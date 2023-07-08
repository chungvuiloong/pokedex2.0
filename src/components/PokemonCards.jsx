
import React from 'react';

const PokemonCards = ({ name, image, type }) => {
  return (
    <div>
      <h2>{name}</h2>
      <img src={image} alt={name} />
      <p>Type: {type}</p>
    </div>
  );
};

export default PokemonCards;
