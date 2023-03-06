import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { getPokemonImage } from '../../helpers/getPokemonImage';
import { selectActivePokemon } from '../../store';
import '../styles/pokemon-modal.css'
import { FavoriteIcon } from './FavoriteIcon';

export const PokemonModal = ({show, onClose}) => {

  const activePokemon = useSelector(selectActivePokemon);

  return (
    <>
      {
        Object.keys(activePokemon).length !== 0  && <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>{activePokemon.name.toUpperCase()}</Modal.Title>
            <FavoriteIcon id={activePokemon.id} isFavorite={activePokemon.isFavorite ? true : false} />
          </Modal.Header>
          <Modal.Body>
              <div className='modal-image-container'>
                <img className='modal-image' 
                src={ getPokemonImage(activePokemon.id) }
                alt={ activePokemon.name } 
                />
              </div>
              <div className='modal-pokemon-details'>
                <div className='details-features'>
                  <div className='feature'>
                    <h4 className='feature-name'>Height</h4>
                    <p className='feature-value'>{ activePokemon.height/10 + 'm' }</p>
                  </div>
                  <div className='feature'>
                    <h4 className='feature-name'>Weight</h4>
                    <p className='feature-value'>{ activePokemon.weight/10 + 'kg' }</p>
                  </div>
                  <div className='feature'>
                    <h4 className='feature-name'>Abilities</h4>
                    <ul className='feature-value' >
                      { activePokemon.abilities.map((ability, index) => (
                          <li key={ index } >{ ability.ability.name }</li>
                        )) }
                    </ul>
                  </div>
                  <div className='feature'>
                    <h4 className='feature-name'>Type</h4>
                    <ul className='feature-value'>
                      { activePokemon.types.map((type, index) => (
                          <li key={ index } >{ type.type.name }</li>
                        )) } 
                    </ul>
                  </div>
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        }
    </>
  );
}
