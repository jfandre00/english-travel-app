import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fecha o menu ao clicar em um link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" onClick={handleLinkClick}>
          English for Travel
        </Link>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        &#9776; {/* Ícone de Hambúrguer */}
      </button>

      <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={handleLinkClick}>
          Início
        </Link>
        <Link to="/words" onClick={handleLinkClick}>
          Palavras & Flashcards
        </Link>
        <Link to="/phrases" onClick={handleLinkClick}>
          Frases
        </Link>
        <Link to="/listening" onClick={handleLinkClick}>
          Listening Game
        </Link>
      </nav>
    </header>
  );
}