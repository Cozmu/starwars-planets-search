import React from 'react';
import logo from '../imgs/logo-star-wars.png';
import elipce from '../imgs/grafismo-topo.png';
import '../style/Header.css';

function Header() {
  return (
    <header className="header-container">
      <section className="logo-container">
        <img src={ logo } alt="logo-star-wars" />
      </section>
      <section className="elipse-container">
        <img className="elipse" src={ elipce } alt="elipse" />
      </section>
    </header>
  );
}

export default Header;
