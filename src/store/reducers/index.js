import { combineReducers } from "redux";

import pokemon from "./pokemonReducer";

const rootReducer = combineReducers({
  pokemon,
  // Here you can registering another reducers.
});

export default rootReducer;
