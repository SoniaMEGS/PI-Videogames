import React from "react";
import { NavLink } from "react-router-dom";
import "../style/Landing.css";
import Videogame from "../assets/videogame.png";

const Landing = () => {
  return (
    <section className="landing">
      <img className="landing_img" src={Videogame} alt="" />
      <NavLink to="/home">
        <button className="landing_button">Get in!</button>
      </NavLink>
    </section>
  );
};

export default Landing;
