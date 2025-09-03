import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

// ALTERADO: Recebendo a prop 'isLoggedIn'
export default function Header({ isLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" onClick={handleLinkClick} style={{textDecoration: "none", color: "#FDC638", fontWeight: "bold"}}>
          Teacher Denise's App
        </Link>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        &#9776; {/* Ícone de Hambúrguer */}
      </button>

      <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
        {/* ALTERADO: Este link só aparece se o usuário for VIP (isLoggedIn === true) */}
        {isLoggedIn && (
          <Link to="/" onClick={handleLinkClick} style={{color: "#FDC638", fontWeight: "bold"}}>
            Palavras Favoritas
          </Link>
        )}

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