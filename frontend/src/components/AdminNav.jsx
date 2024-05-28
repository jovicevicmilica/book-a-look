import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logofinal 1.svg";

const AdminNav = () => {
  return (
    <section className="header">
      <a href="/" className="logo"><img src={logo} alt="logo"></img></a>
      <nav className="navbar">
        <div id="close-navbar" className="fas fa-times"></div>
        <span>Admin</span>
        <Link to="/">Početna</Link>
        <Link to="/allBookings">Tretmani</Link>
        <Link to="/salons">Pregledaj salone</Link>
        <Link to="/logout">Odjavi se</Link>
      </nav>
      <div id="menu-btn" className="fas fa-bars"></div>
    </section>
  );
};

export default AdminNav;