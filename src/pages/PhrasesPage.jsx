import React from "react";
import PhraseList from "../components/PhraseList";
import { restaurantPhrases, airportPhrases } from "../data/phrases";

export default function PhrasesPage() {
  return (
    <>
      <p
        style={{
          padding: 20,
          font: "sans-serif",
          fontSize: 20,
          fontWeight: "bolder",
          color: "blue",
          border: "2px solid red",
          borderRadius: "5px",
          textAlign: "center"
        }}
      >
        Frases Mais Comuns Em Cada Local
      </p>
      <PhraseList category="Restaurante" phrases={restaurantPhrases} />
      <PhraseList category="Aeroporto" phrases={airportPhrases} />
    </>
  );
}