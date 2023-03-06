import {  useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonImage } from '../../helpers/getPokemonImage'
import { cleanActivePokemon, fetchPokemonActive } from '../../store';
import '../styles/pokemon-card.css'
import { FavoriteIcon } from './FavoriteIcon';
import { PokemonModal } from './PokemonModal';

export const PokemonCard = ({name, id, isFavorite}) => {

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  
  const handleClose = () => {
    setShow(false);
    dispatch(cleanActivePokemon());
  };

  const handleShow = () => {
    dispatch(fetchPokemonActive(id));
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
