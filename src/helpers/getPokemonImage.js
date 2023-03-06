const IMAGES_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export const getPokemonImage = (id) => {
  return IMAGES_URL + id + ".png";
};
