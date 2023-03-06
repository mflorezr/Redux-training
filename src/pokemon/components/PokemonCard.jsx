import {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonImage } from '../../helpers/getPokemonImage'
import { ACTIVE_POKEMON_REQUESTED, CLEAN_ACTIVE_POKEMON } from '../../store/actions/pokemon-actions';
import '../styles/pokemon-card.css'
import { FavoriteIcon } from './FavoriteIcon';
import { PokemonModal } from './PokemonModal';

export const PokemonCard = ({name, id}) => {

  const [show, setShow] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.pokemon.favorites);


  useEffect(() => {
    const pokemonFavorite = favorites.filter(pokemonId => pokemonId === id);
    if(pokemonFavorite.length > 0){
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites])
  
  
  const handleClose = () => {
    setShow(false);
    dispatch({type: CLEAN_ACTIVE_POKEMON});
  };

  const handleShow = () => {
    dispatch({type: ACTIVE_POKEMON_REQUESTED, payload: id});
    setShow(true)
  };

  return (
      <div className="card-container">
        <div className="img-container" onClick={handleShow}>
          <img className='pokemon-image' src={getPokemonImage(id)} alt="pokemon-image" />
        </div>
        <div className="pokemon-name-container">
          <span>{name.toUpperCase()}</span>
        </div>
        <FavoriteIcon id={id} isFavorite={isFavorite} />
        <PokemonModal show={show} onClose={handleClose} /> 
      </div>
  )
}
