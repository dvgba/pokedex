import React from 'react';
import { Link } from 'react-router-dom';

function PokemonCard({ pokemon }) {
    return (
        <div className="pokemon-card">
        <Link to={`/pokemon/${pokemon.url.split('/').slice(-2, -1)}`}>
            <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)}.png`}
            alt={pokemon.name}
            />
            <p>{pokemon.name.toUpperCase()}</p>
        </Link>
        </div>
    );
}

export default PokemonCard;
