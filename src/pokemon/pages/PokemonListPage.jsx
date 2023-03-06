import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPokemons, selectPokemons, selectStatus } from "../../store"
import { PokemonCard } from "../components/PokemonCard"

import '../styles/pokemon-list.css'

export const PokemonListPage = () => {

  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const pokemons = useSelector(state => state.pokemon.pokemons);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener( 'scroll', scrollHandler);
    }
  }, []);

  useEffect(() => {
    if(status === 'idle') {
      dispatch(fetchPokemons());
    }
  },[status, dispatch])

  useEffect(() => {
    if( isScrolled && pokemons.length !== 0) {
      const pokemonsToLoad = pokemons.length + 20;
      dispatch(fetchPokemons({offset: pokemons.length, limit:pokemonsToLoad}));
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
        pokemons.map(pokemon => (
          <div key={pokemon.id}>
            <PokemonCard {...pokemon} />
          </div>
        ))
      }
    </div>
  )
}
