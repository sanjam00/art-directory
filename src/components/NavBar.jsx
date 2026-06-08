import { NavLink } from "react-router"

export default function NavBar(){

  return (
    <nav className="NavBar">

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