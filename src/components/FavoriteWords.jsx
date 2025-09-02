import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { wordList } from "../data/wordList";
import "./FavoriteWords.css";

function getRandomWords(arr, n) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const FavoriteWords = forwardRef(({ currentUser, isEditing }, ref) => {
  const [favorites, setFavorites] = useState([]);
  const [newWords, setNewWords] = useState([]);
  const [activeWord, setActiveWord] = useState(null);
  const [wordsToDelete, setWordsToDelete] = useState([]);

  const isInitialMount = useRef(true);
  const timeoutRef = useRef(null);

  const storageKey = `favorite-words-${currentUser}`;

  useImperativeHandle(ref, () => ({
    saveChanges() {
      const newFavorites = favorites.filter(
        (word) => !wordsToDelete.includes(word)
      );
      setFavorites(newFavorites);
      setWordsToDelete([]);
    },
  }));

  const handleFavoriteClick = (word) => {
    if (isEditing) {
      setWordsToDelete((prev) =>
        prev.includes(word)
          ? prev.filter((w) => w !== word)
          : [...prev, word]
      );
    } else {
      playPronunciation(word);
    }
  };

  const playPronunciation = (word) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveWord(word);
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
    timeoutRef.current = setTimeout(() => {
      setActiveWord(null);
      timeoutRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    setFavorites(saved);
  }, [storageKey]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localStorage.setItem(storageKey, JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    if (!isEditing) {
      setWordsToDelete([]);
    }
  }, [isEditing]);

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
      <h3 style={{ marginBottom: 10 }}>
        {isEditing
          ? "Selecione as palavras para remover"
          : "Palavras favoritas (clique para ouvir)"}
      </h3>
      <div className="favorites-grid">
        {favorites.length === 0 && (
          <p className="empty-message">
            Você ainda não escolheu palavras favoritas.
          </p>
        )}
        {favorites.map((word) => (
          <button
            key={word}
            className={`
              favorite-card 
              ${activeWord === word ? "active-favorite-card" : ""}
              ${
                isEditing && wordsToDelete.includes(word)
                  ? "marked-for-deletion"
                  : ""
              }
            `}
            onClick={() => handleFavoriteClick(word)}
            type="button"
          >
            {word}
          </button>
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
});

export default FavoriteWords;