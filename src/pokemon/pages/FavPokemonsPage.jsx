import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PokemonCard } from "../components/PokemonCard";


export const FavPokemonsPage = () => {
  const favorites = useSelector(state => state.pokemon.favorites);
  const pokemons = useSelector(state => state.pokemon.pokemons);
  const [favoritePokemons, setFavoritePokemons] = useState([]);

  useEffect(() => {
    setFavoritePokemons(pokemons.filter(pokemon => favorites.includes(pokemon.id)));
  }, [favorites])
  

  return (
    <div className="list-container">
      {
        favoritePokemons.map(pokemon => (
          <div key={pokemon.url}>
            <PokemonCard {...pokemon} />
          </div>
        ))
      }
    </div>
  )
}
