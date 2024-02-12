import React from "react";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <NavLink to="/home">
        <button>Get in!</button>
      </NavLink>
    </div>
  );
};

export default Landing;
