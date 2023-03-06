const POKEMONS_URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemons = async (offset = 0) => {
  try {
    const response = await fetch(`${POKEMONS_URL}?offset=${offset}`);
    const pokemons = response.json();
    return pokemons;
  } catch (error) {
    return error.message;
  }
};

export const getPokemonInfo = async (id) => {
  try {
    const response = await fetch(`${POKEMONS_URL}/${id}`);
    const pokemonInfo = response.json();
    return pokemonInfo;
  } catch (error) {
    return error.message;
  }
};

export const getPokemonSpecie = async (id) => {
  try {
    const response = await fetch(`${POKEMONS_URL}-species/${id}`);
    const pokemonInfo = response.json();
    return pokemonInfo;
  } catch (error) {
    return error.message;
  }
};
