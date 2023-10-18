import {useEffect, useState} from "react";
import axios from "axios";
import Buttons from "../Buttons/Buttons.jsx";


function AllPokemon () {
    const [pokemon, setPokemon] = useState([]);
    const [error, toggleError] = useState(false);
    const [offset, setOffset] = useState(0);
    const [loading, toggleLoading] = useState(false)

    useEffect(() => {
        async function fetchPokemon() {
            toggleError(false);
            toggleLoading(true);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
                const pokemonList = response.data.results;

                // Fetch detailed information for each Pokémon
                const pokemonData = pokemonList.map(async (pokemonUrlList) => {
                    const detailedResponse = await axios.get(pokemonUrlList.url);
                    return detailedResponse.data;
                });

                const detailedPokemonData = await Promise.all(pokemonData);

                // Now, `detailedPokemonData` contains detailed information about each Pokémon
                setPokemon(detailedPokemonData);
            } catch (e) {
                console.error(e);
                toggleError(true);
            } finally {
                toggleLoading(false)
            }
    }
        void fetchPokemon();
    },[offset]);


    const handleNext = () => {
            setOffset(offset + 20);
    };

    const handlePrevious = () => {
        if (offset > 0) {
            setOffset(offset - 20);
        }

    };





    return (
    <div>
        <Buttons onNext = {handleNext} onPrevious = {handlePrevious}/>

        <div className="parent-container">
            {pokemon.length > 0 && pokemon.map((pokemon) => (
            <ul key={pokemon.id}>
                <li className="pokemonCard">
                    <img src={pokemon.sprites.front_default} alt="pokemon picture"/>
                    <h3>Name: {pokemon.name}</h3>
                        {pokemon.abilities && pokemon.abilities.length > 0 && (
                        <p>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                        )}
                        <p> Moves: {pokemon.moves ? pokemon.moves.length : 0}</p>
                        <p>Weight: {pokemon.weight}</p>

                </li>
                {error && <p>de pokemon willen niet geladen worden!</p>}
                {loading && <p>loading....</p>}
            </ul>
            ))}
        </div>
    </div>

);
}

export default AllPokemon;

