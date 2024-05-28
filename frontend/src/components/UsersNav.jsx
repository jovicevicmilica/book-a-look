import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logofinal 1.svg";

const UsersNav = () => {
  return (
    <section className="header">
      <a href="/" className="logo"><img src={logo} alt="logo"></img></a>
      <nav className="navbar">
        <div id="close-navbar" className="fas fa-times"></div>
        <Link to="/">Početna</Link>
        <Link to="/profile">Profil</Link>
        <Link to="/book">Zakaži tretman</Link>
        <Link to="/logout">Odjavi se</Link>
      </nav>
      <div id="menu-btn" className="fas fa-bars"></div>
    </section>
  );
};

export default UsersNav;