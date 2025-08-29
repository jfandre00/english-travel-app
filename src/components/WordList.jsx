import React from "react";
import { useFetchAudio } from "../hooks/useFetchAudio";

const words = [
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
  "help",
  "hotel",
  "airport",
  "taxi",
  "bus",
  "train",
  "ticket",
  "money",
  "emergency",
  "doctor",
];

export default function WordList() {
  const { fetchAudio, audioUrl, loadingWord } = useFetchAudio();

  return (
    <div>
      <h3>Clique em uma palavra para ouvir a pronúncia</h3>
      <div className="word-grid">
        {words.map((word) => (
          <button
            key={word}
            className="word-button"
            onClick={() => fetchAudio(word)}
            disabled={loadingWord === word}
          >
            {loadingWord === word ? "..." : word}
          </button>
        ))}
      </div>

      {audioUrl && (
        <audio controls autoPlay src={audioUrl}>
          Seu navegador não suporta o áudio.
        </audio>
      )}
      <br />
      <br />
      <hr />
    </div>
  );
}
