import { NavLink } from "react-router"
import SearchBar from "./SearchBar"

export default function NavBar(){

  return (
    <nav className="NavBar">
      <SearchBar />

      <NavLink to='/'>
        Home
      </NavLink>

      <NavLink to='/artistpage'>
        Artist Page
      </NavLink>

      <NavLink to='/artworkpage'>
        Artwork Page
      </NavLink>

      <NavLink to='/contactpage'>
        Contact Page
      </NavLink>

    </nav>
  )
}