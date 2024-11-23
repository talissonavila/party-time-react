import { NavLink } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav id="navbar">
        <h2>Party Time</h2>
        <ul>
            <li>
                <NavLink to="/">My parties</NavLink>
            </li>
            <li>
                <NavLink to="/party/new" className="btn">Create new party</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar;