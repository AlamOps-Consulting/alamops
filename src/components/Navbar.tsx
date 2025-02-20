import React from "react";

const Navbar: React.FC = () => {
  return (
    <header>
      <nav>
        <div className="logo">
          <h1>AlamOps</h1>
        </div>
        <ul className="nav-links">
          <li><a href="#inicio">Inicio </a></li>
          <li><a href="#news">News</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
