import { Route, Routes } from "react-router-dom"
import {FavPokemonsPage, NavBar} from "../pokemon/"
import {PokemonListPage} from "../pokemon/"

export const AppRouter = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/*" element={<PokemonListPage />} />
        <Route path="/favs" element={<FavPokemonsPage/>} />
      </Routes>
    </div>
  )
}
