import React from "react";
import "./PhraseList.css";

export default function PhraseList({ category, phrases }) {
  return (
    <div className="phrase-section">
      <h2>{category}</h2>
      <ul className="phrase-list">
        {phrases.map((phrase, index) => (
          <li key={index} className="phrase-item">
            <strong>{phrase.en}</strong>
            <span className="translation">{phrase.pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
