import { Link } from "react-router-dom";
import pokemonLogo from '../../assets/pokemon-23.svg'

export const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src={pokemonLogo} width="150" height="50" alt=""/>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <Link to="/" className="nav-link">
                Pokemons
            </Link>
            <Link to="/favs" className="nav-link">
              My favorites
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  )
}
