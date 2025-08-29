import React, { useState } from "react";
import "./FlashcardGrid.css";

const words = [
  { en: "hello", pt: "olá" },
  { en: "goodbye", pt: "tchau" },
  { en: "please", pt: "por favor" },
  { en: "thank you", pt: "obrigado" },
  { en: "sorry", pt: "desculpe" },
  { en: "water", pt: "água" },
  { en: "food", pt: "comida" },
  { en: "help", pt: "ajuda" },
];

export default function FlashcardGrid() {
  const [flipped, setFlipped] = useState({});

  const toggleCard = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div>
      <br />
      <h3>Clique para ver o significado</h3>
      <div className="flashcard-grid">
        {words.map((word, index) => (
          <div
            key={index}
            className={`flashcard ${flipped[index] ? "flipped" : ""}`}
            onClick={() => toggleCard(index)}
          >
            {flipped[index] ? word.pt : word.en}
          </div>
        ))}
      </div>
    </div>
  );
}
