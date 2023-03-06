import { current, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const POKEMONS_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemons = createAsyncThunk(
  "pokemons/getPokemons",
  async (params = { offset: 0, limit: 20 }) => {
    const { offset, limit } = params;
    try {
      const response = await fetch(
        `${POKEMONS_URL}?limit=${limit}&offset=${offset}`
      );
      const pokemons = response.json();
      return pokemons;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchPokemonActive = createAsyncThunk(
  "pokemon/getPokemonInfo",
  async (id) => {
    try {
      const response = await fetch(`${POKEMONS_URL}/${id}`);
      const pokemonInfo = response.json();
      return pokemonInfo;
    } catch (error) {
      return error.message;
    }
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemons: [],
    status: "idle",
    error: "",
    activePokemon: {},
    activePokemonStatus: "idle",
  },
  reducers: {
    addFavorite: (state, action) => {
      state.pokemons = state.pokemons.map((pokemon) => {
        if (pokemon.id === action.payload) {
          pokemon.isFavorite = true;
        }
        return pokemon;
      });
    },
    removeFavorite: (state, action) => {
      state.pokemons = state.pokemons.map((pokemon) => {
        if (pokemon.id === action.payload) {
          pokemon.isFavorite = false;
        }
        return pokemon;
      });
    },
    cleanActivePokemon: (state) => {
      state.activePokemon = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPokemons.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = "succeed";
        const newPokemons = action.payload.results.map((pokemon) => {
          pokemon.id = parseInt(pokemon.url.slice(34, -1));
          return pokemon;
        });
        state.pokemons = [...state.pokemons, ...newPokemons];
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPokemonActive.pending, (state, action) => {
        state.activePokemonStatus = "loading";
      })
      .addCase(fetchPokemonActive.fulfilled, (state, action) => {
        state.activePokemonStatus = "succeed";
        const pokemon = current(state.pokemons).filter(
          (pokemon) => pokemon.name === action.payload.name
        );
        if (pokemon.length && pokemon[0].isFavorite) {
          action.payload.isFavorite = true;
        }
        state.activePokemon = { ...action.payload };
      })
      .addCase(fetchPokemonActive.rejected, (state, action) => {
        state.activePokemonStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectPokemons = (state) => state.pokemon.pokemons;
export const selectStatus = (state) => state.pokemon.status;
export const selectActivePokemon = (state) => state.pokemon.activePokemon;

// Action creators are generated for each case reducer function
export const { addFavorite, removeFavorite, cleanActivePokemon } =
  pokemonSlice.actions;
