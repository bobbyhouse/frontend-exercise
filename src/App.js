import { useEffect, useState } from "react";
import {
    fetchEvolutionChainById,
    fetchPokemonDetailsByName,
    fetchAllPokemon,
} from "./api";

function Name({ name }) {
    return <h1>{name}</h1>
}

function Types({ types }) {
    return (
        <div className='details-item'>
            <h2>Types</h2>
            <ul className='details-list'>
                {types.map(type => <li className='details-list-item' key={type.type.name}>{type.type.name}</li>) }
            </ul>
        </div>
    );
}

function Moves({ moves }) {
    return (
        <div className='details-item'>
            <h2>Moves</h2>
            <ul className={'details-list'}>
                {moves.slice(0, 4).map(move => 
                    <li key={move.move.name} className='details-list-item'>{move.move.name}</li>) 
                }
            </ul>
        </div>
    );
}

function Evolutions({ chain }) {
    const getAllSpeciesNames = (node) => {
        const speciesNames = [node.species.name];
        if (node.evolves_to && node.evolves_to.length > 0) {
            node.evolves_to.forEach(child => {
                const childSpeciesNames = getAllSpeciesNames(child);
                speciesNames.push(...childSpeciesNames);
            });
        }
        return speciesNames;
    }
    return (
        <div className='details-item'>
            <h2>Evolutions</h2>
            <ul className='details-list'>
                {getAllSpeciesNames(chain).map(
                    name => <li key={name} className='details-list-item'>{name}</li>
                )}
            </ul>
        </div>
    );
}

function Details({ name, types, chain, moves}){
    return (
        <div className={'pokedex__details'}>
            <div className={'pokedex__details__name'}>
                <Name name={name} />
            </div>
            <div className={'pokedex__details__group'}>
                <div className={'pokedex__details__types'}>
                    <Types types={types} />
                </div>
                <div className={'pokedex__details__moves'}>
                    <Moves moves={moves} />
                </div>
            </div>
            <div className={'pokedex__details__evolutions'}>
                <Evolutions chain={chain} />
            </div>
        </div>
    );
}

function App() {
    const [pokemonIndex, setPokemonIndex] = useState([])
    const [pokemon, setPokemon] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [pokemonDetails, setPokemonDetails] = useState()

    const fetchPokemon = async () => {
        const {results: pokemonList} = await fetchAllPokemon()
        setPokemon(pokemonList)
        setPokemonIndex(pokemonList)
    }

    const fetchDetails = async (name) => {
        const details = await fetchPokemonDetailsByName(name) 
        const { chain } = await fetchEvolutionChainById(details.id)

        setPokemonDetails({
            details,
            chain,
        })
    }

    useEffect(() => {
        fetchPokemon();
    }, [])

    const onSearchValueChange = (event) => {
        const value = event.target.value
        setPokemonDetails(null)
        setSearchValue(value)

        setPokemon(
            pokemonIndex.filter(monster => monster.name.includes(value))
        )
    }

    const onGetDetails = (monster) => async () => {
        fetchDetails(monster.name)
    }

    return (
        <div className={'pokedex__container'}>
            <div className={'pokedex__search-input'}>
                <input value={searchValue} onChange={onSearchValueChange} placeholder={'Search Pokemon'}/>
            </div>
            <div className={'pokedex__content'}>
                {pokemon.length > 0 && (
                    <div className={'pokedex__search-results'}>
                        {
                            pokemon.map(monster => {
                                return (
                                    <div className={'pokedex__list-item'} key={monster.name}>
                                        <div>
                                            {monster.name}
                                        </div>
                                        <button onClick={onGetDetails(monster)}>Get Details</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
                {pokemon.length === 0 && !!searchValue && (
                    <div className={'pokedex__search-results--no-results'}>
                        <p>No results</p>
                    </div>
                )}
                {
                    pokemonDetails && (
                        <Details
                            name={pokemonDetails.details?.name}
                            types={pokemonDetails.details?.types}
                            chain={pokemonDetails?.chain}
                            moves={pokemonDetails.details?.moves}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default App;