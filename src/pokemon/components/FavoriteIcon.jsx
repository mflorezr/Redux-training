import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../store";

export const FavoriteIcon = ({id, isFavorite}) => {
  const [isFav, setIsFav] = useState(isFavorite);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFav(isFavorite);
  }, [isFavorite])
  

  const addFavoriteHandler = () => {
    if(!isFav) {
      dispatch(addFavorite(id));
    } else {
      dispatch(removeFavorite(id));
    }
    setIsFav(!isFav)
  }

  return (
    <div className='fav-icon'>
      <i className={( isFav ? 'fa' : 'far') + ' fa-heart'} aria-hidden="true" onClick={addFavoriteHandler}></i>
    </div>
  )
}
