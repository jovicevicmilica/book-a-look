import React from 'react';
import logo from "../images/logofinal 1.svg";

const Navbar = () => {
  return (
    <section className="header">
      <a href="/" className="logo"><img src={logo}></img></a>
      <nav className="navbar">
        <div id="close-navbar" className="fas fa-times"></div>
        <a href="/">Početna</a>
        <a href="/login">Prijavi se</a>
        <a href="/signup">Registruj se</a>
      </nav>
      <div id="menu-btn" className="fas fa-bars"></div>
    </section>
  );
};

export default Navbar;
