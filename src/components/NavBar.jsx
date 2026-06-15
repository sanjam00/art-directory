import { NavLink } from "react-router"
import SearchBar from "./SearchBar"
import "./NavBar.css"

export default function NavBar(){

  return (
    <nav className="navbar">
      <SearchBar />

      <NavLink to='/'>
        Home
      </NavLink>

      <NavLink to='/artists'>
        Artist Page
      </NavLink>

      <NavLink to='/artworks'>
        Artwork Page
      </NavLink>

      <NavLink to='/contactpage'>
        Contact Page
      </NavLink>

    </nav>
  )
}