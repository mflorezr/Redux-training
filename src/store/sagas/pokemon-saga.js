import {
  ACTIVE_POKEMON_FAILED,
  ACTIVE_POKEMON_LOADING,
  ACTIVE_POKEMON_REQUESTED,
  ACTIVE_POKEMON_SUCCEED,
  POKEMON_ALL_FAILED,
  POKEMON_ALL_LOADING,
  POKEMON_ALL_REQUESTED,
  POKEMON_ALL_SUCCEED,
} from "../actions/pokemon-actions";
import { getPokemonInfo, getPokemons, getPokemonSpecie } from "../api/poke-api";
import { put, call, all, select, takeEvery, fork } from "redux-saga/effects";
import { getGender } from "../../helpers/getGender";

export const getFavorites = (state) => state.pokemon.favorites;

function* fetchPokemons({ offset }) {
  yield put({ type: POKEMON_ALL_LOADING });
  try {
    const pokemons = yield call(getPokemons, offset);
    yield put({ type: POKEMON_ALL_SUCCEED, payload: pokemons.results });
  } catch (error) {
    yield put({ type: POKEMON_ALL_FAILED, payload: error.message });
  }
}

function* fetchPokemonInfo({ payload }) {
  yield put({ type: ACTIVE_POKEMON_LOADING });
  const favorites = yield select(getFavorites);
  try {
    const pokemonInfo = yield call(getPokemonInfo, payload);
    const pokemonSpecie = yield call(getPokemonSpecie, payload);
    pokemonInfo.description = pokemonSpecie.flavor_text_entries[1].flavor_text;
    pokemonInfo.gender = getGender(pokemonSpecie.genderRate);
    pokemonInfo.generation = pokemonSpecie.generation.name;
    const isFavorite = favorites.filter(
      (pokemonId) => pokemonId === pokemonInfo.id
    );
    if (isFavorite.length) {
      pokemonInfo.isFavorite = true;
    }
    yield put({ type: ACTIVE_POKEMON_SUCCEED, payload: pokemonInfo });
  } catch (error) {
    yield put({ type: ACTIVE_POKEMON_FAILED, payload: error.message });
  }
}

export default function* pokemonSaga() {
  yield takeEvery(POKEMON_ALL_REQUESTED, fetchPokemons);
  yield takeEvery(ACTIVE_POKEMON_REQUESTED, fetchPokemonInfo);
}
