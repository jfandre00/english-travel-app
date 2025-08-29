import React, { useState, useEffect, useRef } from "react";
import { wordList } from "../data/wordList";
import "./FavoriteWords.css";

function getRandomWords(arr, n) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function FavoriteWords({ currentUser }) {
  const [favorites, setFavorites] = useState([]);
  const [newWords, setNewWords] = useState([]);

  // Ref para controlar se é a renderização inicial
  const isInitialMount = useRef(true);

  // Chave específica por usuário no localStorage
  const storageKey = `favorite-words-${currentUser}`;

  // Efeito 1: CARREGAR os dados do localStorage (apenas quando o usuário muda)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    setFavorites(saved);
  }, [storageKey]);

  // Efeito 2: SALVAR os dados, mas pulando a primeira vez
  useEffect(() => {
    // Se for a renderização inicial, nós pulamos o salvamento.
    if (isInitialMount.current) {
      isInitialMount.current = false; // Nas próximas vezes, não será mais a inicial
    } else {
      // A partir da segunda renderização, qualquer mudança em 'favorites' será salva.
      localStorage.setItem(storageKey, JSON.stringify(favorites));
    }
  }, [favorites]); // Note que este efeito só depende de 'favorites'

  // Efeito 3: Gerar novas palavras quando os favoritos mudam
  useEffect(() => {
    const availableWords = wordList.filter((w) => !favorites.includes(w));
    const selected = getRandomWords(availableWords, 20);
    setNewWords(selected);
  }, [favorites]);

  const toggleFavorite = (word) => {
    setFavorites((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  };

  return (
    <div className="container">
      <h3 style={{ marginBottom: 10 }}>Palavras favoritas</h3>
      <div className="favorites-grid">
        {favorites.length === 0 && (
          <p className="empty-message">
            Você ainda não escolheu palavras favoritas.
          </p>
        )}
        {favorites.map((word) => (
          <div key={word} className="favorite-card">
            {word}
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: 10 }}>Escolha novas palavras</h3>
      <div className="word-button-grid">
        {newWords.length === 0 && <p>Você já escolheu todas as palavras!</p>}
        {newWords.map((word) => (
          <button
            key={word}
            onClick={() => toggleFavorite(word)}
            className={`word-button-favorite ${
              favorites.includes(word) ? "selected" : ""
            }`}
          >
            {word} {favorites.includes(word) && "⭐"}
          </button>
        ))}
      </div>
    </div>
  );
}