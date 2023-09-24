import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokedex.css'; 
import PokemonCard from './PokemonCard';


function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(currentPage - 1) * 10}`)
        .then((response) => {
            setPokemonList(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 10));
        });
    }, [currentPage]);

    const handleSearch = () => {
        const filteredResults = pokemonList.filter((pokemon) =>
        pokemon.name.includes(searchTerm.toLowerCase()) ||
        pokemon.url.includes(searchTerm)
        );
        setSearchResults(filteredResults);
    };



    return (
        <div className="container">
            <h1>Pokédex</h1>
            <div className= "Busca">
                <input
                    type="text"
                    id="inline_field"
                    className="text"
                    placeholder="Digite o nome do Pokémon"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Pesquisar</button>
            </div>
            <ul className="pokemon-grid">
                {searchResults.length > 0
                ? searchResults.slice(0, 6).map((pokemon, index) => (
                    <li key={index}>
                        <PokemonCard pokemon={pokemon} />
                    </li>
                    ))
                : pokemonList.slice(0, 6).map((pokemon, index) => (
                    <li key={index}>
                        <PokemonCard pokemon={pokemon} />
                    </li>
                    ))}
            </ul>
            <div className="Botões">
                {currentPage > 1 && (
                <button onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>
                )}
                {currentPage < totalPages && (
                <button onClick={() => setCurrentPage(currentPage + 1)}>Próxima</button>
                )}
            </div>
        </div>
    );

}

export default Pokedex;
