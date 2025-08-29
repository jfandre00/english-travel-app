import React, { useState } from "react";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="logo">Teacher Denise's Travel App</div>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <a href="#words" onClick={closeMenu}>
          Word List
        </a>
        <a href="#flashcards" onClick={closeMenu}>
          Flashcards
        </a>
        <a href="#phrases" onClick={closeMenu}>
          Frases
        </a>
        <a href="#listening" onClick={closeMenu}>
          Listening Game
        </a>
      </nav>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
}
