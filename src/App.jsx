import React, { useState } from "react";
import "./styles.css";

import Login from "./components/Login";
import WordList from "./components/WordList";
import FlashcardGrid from "./components/FlashcardGrid";
import PhraseList from "./components/PhraseList";
import { restaurantPhrases, airportPhrases } from "./data/phrases";
import ListeningGame from "./components/ListeningGame";
import Header from "./components/Header";
import FavoriteWords from "./components/FavoriteWords";

// preciso implementar Firebase Authentication no próximo TP
import { authorizedUsers } from "./data/authorizedUsers";

export default function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [skipLogin, setSkipLogin] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogin = (name) => {
    const normalizedName = name.trim().toLowerCase();
    if (authorizedUsers.includes(normalizedName)) {
      setUsername(normalizedName);
      setIsLoggedIn(true);
      setLoginFailed(false);
    } else {
      setLoginFailed(true);
    }
  };

  const handleSkip = () => {
    setSkipLogin(true);
    setLoginFailed(false);
  };

  const handleLogout = () => {
    setUsername("");
    setIsLoggedIn(false);
    setSkipLogin(false);
  };

  if (!isLoggedIn && !skipLogin) {
    // Tela de login.
    return (
      <Login
        onLogin={handleLogin}
        onSkip={handleSkip}
        loginFailed={loginFailed}
      />
    );
  }

  // Conteúdo principal
  // ATENÇÃO: PRECISO REMOVER OS INLINES,AGORA QUE TERMINEI ESSA VERSÃO
  // FAZER ISSO PARA O TP4 URGENTE, O CÓDIGO ESTÁ UMA BAGUNÇA
  //------------------------------------------------
  return (
    <div className="app-container">
      <Header />
      <div style={{ paddingTop: "50px" }}>
        {/* Botão Voltar para tela de login aparece se usuário acessou sem login */}
        {skipLogin && (
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <button
              onClick={handleLogout}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                border: "1px solid #007bff",
                cursor: "pointer",
                backgroundColor: "#b30000",
                color: "white",
              }}
            >
              Voltar para tela de login
            </button>
          </div>
        )}

        <img
          className="imgTeacher"
          src="https://teacherdenise.com/img/logo.JPG"
          alt="Teacher Denise Logo"
          style={{ display: "block", margin: "0 auto" }}
        />

        {isLoggedIn && (
          <section id="favorite">
            <hr style={{ margin: "2rem 0" }} />
            <div
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <p>
                {/* Solução "gambiarra" - preciso pesquisar algo melhor para deixar a primeira maíscula
                Mas talvez essa funcionalidade não exista na próxima versão 
                Pois utilizarei o Google Firebase */}
                Bem-vindo,{" "}
                <strong>
                  {username.charAt(0).toUpperCase() +
                    username.slice(1).toLowerCase()}
                </strong>
                !
              </p>
              <button
                onClick={handleLogout}
                style={{
                  cursor: "pointer",
                  padding: "0.3rem 0.7rem",
                  borderRadius: "8px",
                  border: "2px solid grey",
                  backgroundColor: "#007bff",
                  color: "white",
                }}
                title="Logout"
              >
                Logout
              </button>
            </div>
            <FavoriteWords currentUser={username} />
          </section>
        )}

        <section id="words">
          <hr style={{ margin: "2rem 0" }} />
          <section id="flashcards">
            <WordList />
          </section>
          <FlashcardGrid />
        </section>

        <section id="phrases">
          <hr style={{ margin: "2rem 0" }} />
          <p
            style={{
              padding: 20,
              font: "sans-serif",
              fontSize: 20,
              fontWeight: "bolder",
              color: "blue",
              border: "2px solid red",
              borderRadius: "5px",
            }}
          >
            Frases Mais Comuns Em Cada Local
          </p>
          <PhraseList category="Restaurante" phrases={restaurantPhrases} />
          <PhraseList category="Aeroporto" phrases={airportPhrases} />
          <hr style={{ margin: "2rem 0" }} />
        </section>

        <section id="listening">
          <ListeningGame />
        </section>
      </div>
    </div>
  );
}
