import { NavLink } from "react-router"
import SearchBar from "./SearchBar"
import "./NavBar.css"

export default function NavBar(){

  return (
    <nav className="navbar">
      <SearchBar />

      <NavLink to='/' id="siteLogoName">
        website name
      </NavLink>

      <div className="nav-links">
        <NavLink to='/artists'>
          Artist
        </NavLink>

        <NavLink to='/artworks'>
          Artwork
        </NavLink>

        <NavLink to='/contactpage'>
          Contact
        </NavLink>
      </div>

    </nav>
  )
}