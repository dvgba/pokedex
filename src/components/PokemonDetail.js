import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css'

function PokemonDetail() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => {
            setPokemon(response.data);
        });
    }, [id]);

    if (!pokemon) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <div className='Card'>
                <h1>{pokemon.name.toUpperCase()}</h1>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p>Tipo: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
                <p>Altura: {pokemon.height / 10}m</p>
                <p>Peso: {pokemon.weight / 10}kg</p>
            </div>
            <button onClick={() => window.history.back()}>Retornar</button>
        </div>
    );
}

export default PokemonDetail;
