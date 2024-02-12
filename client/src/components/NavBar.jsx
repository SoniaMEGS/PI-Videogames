import React from "react";
import { NavLink } from "react-router-dom";
import Searcher from "./Searcher";
import "../style/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navBar">
      <ul className="navBar_list">
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/form">Create videogame</NavLink>
        </li>
        {/* <li>Landing</li> */}
      </ul>
      <Searcher />
    </nav>
  );
};

export default NavBar;
