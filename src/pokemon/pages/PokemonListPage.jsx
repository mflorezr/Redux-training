import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { POKEMON_ALL_REQUESTED } from "../../store/actions/pokemon-actions"
import { PokemonCard } from "../components/PokemonCard"

import '../styles/pokemon-list.css'

export const PokemonListPage = () => {

  const dispatch = useDispatch();
  const status = useSelector(state => state.pokemon.status);
  const pokemons = useSelector(state => state.pokemon.pokemons);
  const searchBy = useSelector(state => state.pokemon.searchBy);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pokemonsToShow, setPokemonsToShow] = useState([]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener( 'scroll', scrollHandler);
    }
  }, []);

  useEffect(() => {
    if(status === 'idle') {
       dispatch({type: POKEMON_ALL_REQUESTED});
    }
  },[status, dispatch])

  useEffect(() => {
    if(searchBy.length > 0) {
       setPokemonsToShow(
        pokemons.filter(pokemon => pokemon.name.startsWith(searchBy))
       )
    } else {
      setPokemonsToShow(pokemons);
    }
  },[searchBy, pokemons])

  useEffect(() => {
    if( isScrolled && pokemons.length !== 0) {
      dispatch({type: POKEMON_ALL_REQUESTED, offset: pokemons.length});
      setIsScrolled(false)
    }
  }, [isScrolled, pokemons, dispatch])
  

  const scrollHandler = () => {  
    if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight) {
      setIsScrolled(true);
    }
  }

  return (
    <div className="list-container"  onScroll={scrollHandler}>
      {
        pokemonsToShow.map(pokemon => (
          <div key={pokemon.id}>
            <PokemonCard {...pokemon} />
          </div>
        ))
      }
    </div>
  )
}
