import React from "react";
import useQuiz from "../hooks/useQuiz";

const wordBank = [
  "hello",
  "goodbye",
  "please",
  "thank",
  "sorry",
  "yes",
  "no",
  "bathroom",
  "water",
  "food",
  "airport",
  "hotel",
  "taxi",
  "bus",
  "train",
  "ticket",
  "money",
  "passport",
  "help",
  "emergency",
  "doctor",
  "pharmacy",
  "restaurant",
  "menu",
  "breakfast",
  "lunch",
  "dinner",
  "coffee",
  "tea",
  "juice",
  "beer",
  "wine",
  "check",
  "bill",
  "credit",
  "cash",
  "store",
  "market",
  "supermarket",
  "left",
  "right",
  "straight",
  "map",
  "address",
  "street",
  "exit",
  "entrance",
  "open",
  "closed",
];

export default function ListeningGame() {
  const {
    round,
    score,
    options,
    audioUrl,
    feedback,
    isGameOver,
    select,
    reset,
    maxRounds,
  } = useQuiz(wordBank, 5);

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "0 auto",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <h2>Jogo de Pronúncia</h2>
      <p>
        Round: {round + 1} / {maxRounds} | Score: {score}
      </p>
      {audioUrl ? (
        <button
          onClick={() => new Audio(audioUrl).play()}
          style={{
            padding: "1rem 2rem",
            margin: "1rem",
            backgroundColor: "#007bff",
            borderRadius: "1rem",
            color: "black",
            width: "150px",
          }}
        >
          Ouvir palavra
        </button>
      ) : (
        <p>Carregando...</p>
      )}
      <div
        style={{
          display: "grid",
          gap: "0.5rem",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {options.map((word) => (
          <button
            key={word}
            onClick={() => select(word)}
            disabled={!!feedback || isGameOver}
            style={{
              padding: "0.5rem",
              borderRadius: "1rem",
              border: "1px solid #007bff",
              background: "#b3000027",
              cursor: isGameOver ? "not-allowed" : "pointer",
            }}
          >
            {word}
          </button>
        ))}
      </div>
      {feedback && (
        <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>{feedback}</p>
      )}
      {isGameOver && (
        <button
          onClick={reset}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "1rem",
            border: "1px solid #007bff",
          }}
        >
          Jogar novamente
        </button>
      )}
    </div>
  );
}
