import {
  ACTIVE_POKEMON_FAILED,
  ACTIVE_POKEMON_LOADING,
  ACTIVE_POKEMON_SUCCEED,
  ADD_FAVORITE,
  CLEAN_ACTIVE_POKEMON,
  POKEMON_ALL_FAILED,
  POKEMON_ALL_LOADING,
  POKEMON_ALL_SUCCEED,
  REMOVE_FAVORITE,
  SET_SEARCH_BY,
} from "../actions/pokemon-actions";

const initialState = {
  pokemons: [],
  status: "idle",
  error: "",
  activePokemon: {},
  activePokemonStatus: "idle",
  favorites: [],
  searchBy: "",
};

const pokemon = (state = initialState, { type, payload }) => {
  switch (type) {
    case POKEMON_ALL_LOADING:
      return {
        ...state,
        status: "loading",
      };
    case POKEMON_ALL_SUCCEED:
      return {
        ...state,
        status: "succeed",
        pokemons: [
          ...state.pokemons,
          ...payload.map((pokemon) => {
            pokemon.id = parseInt(pokemon.url.slice(34, -1));
            return pokemon;
          }),
        ],
      };
    case POKEMON_ALL_FAILED:
      return {
        ...state,
        status: "failed",
        error: payload,
      };
    case ACTIVE_POKEMON_LOADING:
      return {
        ...state,
        activePokemonStatus: "loading",
      };
    case ACTIVE_POKEMON_SUCCEED:
      return {
        ...state,
        activePokemonStatus: "succeed",
        activePokemon: { ...payload },
      };
    case ACTIVE_POKEMON_FAILED:
      return {
        ...state,
        activePokemonStatus: "failed",
        error: payload,
      };
    case CLEAN_ACTIVE_POKEMON:
      return {
        ...state,
        activePokemon: {},
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, payload],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((pokemonId) => pokemonId !== payload),
      };
    case SET_SEARCH_BY:
      return {
        ...state,
        searchBy: payload,
      };
    default:
      return state;
  }
};

export default pokemon;
