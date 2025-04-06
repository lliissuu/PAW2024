import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.scss";

const Header = () => {
  return (
    <header className="header">
      <h1>Blog</h1>
      <nav>
        <Link to="/">Strona Główna</Link>
        <Link to="/categories">Kategorie</Link>
      </nav>
    </header>
  );
};

export default Header;
