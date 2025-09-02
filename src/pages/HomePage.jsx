import React from "react";
import FavoriteWords from "../components/FavoriteWords";

// Passamos as props recebidas do App.jsx para o FavoriteWords
export default function HomePage({ favoriteWordsRef, currentUser, isEditing }) {
  return (
    // CORREÇÃO: Adicionando a section e a linha divisória de volta
    <section id="favorite">
      <hr style={{ margin: "2rem 0" }} />
      <FavoriteWords
        ref={favoriteWordsRef}
        currentUser={currentUser}
        isEditing={isEditing}
      />
    </section>
  );
}