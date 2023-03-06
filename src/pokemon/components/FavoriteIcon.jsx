import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../../store/actions/pokemon-actions";

export const FavoriteIcon = ({id, isFavorite}) => {
  const [isFav, setIsFav] = useState(isFavorite);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFav(isFavorite);
  }, [isFavorite])
  

  const addFavoriteHandler = () => {
    if(!isFav) {
      dispatch({ type: ADD_FAVORITE, payload: id});
    } else {
      dispatch({ type: REMOVE_FAVORITE, payload: id});
    }
    setIsFav(!isFav)
  }

  return (
    <div className='fav-icon'>
      <i className={( isFav ? 'fa' : 'far') + ' fa-heart'} aria-hidden="true" onClick={addFavoriteHandler}></i>
    </div>
  )
}
