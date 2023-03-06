import { useSelector } from "react-redux";
import { selectPokemons } from "../../store";
import { PokemonCard } from "../components/PokemonCard";


export const FavPokemonsPage = () => {
  const favoritePokemons = useSelector(selectPokemons).filter(pokemon => pokemon.isFavorite);

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
