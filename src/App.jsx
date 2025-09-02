import React, { useState, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";

// Componentes
import Login from "./components/Login";
import Header from "./components/Header";

// Páginas
import HomePage from "./pages/HomePage";
import WordsPage from "./pages/WordsPage";
import PhrasesPage from "./pages/PhrasesPage";
import ListeningPage from "./pages/ListeningPage";

// Dados
import { authorizedUsers } from "./data/authorizedUsers";

export default function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [skipLogin, setSkipLogin] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [isEditingFavorites, setIsEditingFavorites] = useState(false);
  const favoriteWordsRef = useRef();

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
    setIsEditingFavorites(false);
  };

  const handleToggleEditFavorites = () => {
    if (isEditingFavorites) {
      if (favoriteWordsRef.current) {
        favoriteWordsRef.current.saveChanges();
      }
    }
    setIsEditingFavorites((prev) => !prev);
  };

  if (!isLoggedIn && !skipLogin) {
    return (
      <Login
        onLogin={handleLogin}
        onSkip={handleSkip}
        loginFailed={loginFailed}
      />
    );
  }

  return (
    <div className="app-container">
      <Header />
      <div style={{ paddingTop: "80px" }}>
        
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

        {isLoggedIn && (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem", // Diminuí um pouco a margem
            }}
          >
            <p>
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
                cursor: "pointer", padding: "0.3rem 0.7rem", borderRadius: "8px", border: "2px solid grey", backgroundColor: "#007bff", color: "white",
              }}
              title="Logout"
            >
              Logout
            </button>
            <button
              onClick={handleToggleEditFavorites}
              style={{
                cursor: "pointer", padding: "0.3rem 0.7rem", borderRadius: "8px", border: "2px solid grey", backgroundColor: "#b30000", color: "white",
              }}
            >
              {isEditingFavorites ? "Salvar Alterações" : "Remover Favoritas"}
            </button>
          </div>
        )}

        {/* CORREÇÃO: Imagem da professora adicionada de volta */}
        <img
          className="imgTeacher"
          src="https://teacherdenise.com/img/logo.JPG"
          alt="Teacher Denise Logo"
          style={{ display: "block", margin: "0 auto 1rem auto" }} // Adicionei margem inferior
        />

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <HomePage
                  favoriteWordsRef={favoriteWordsRef}
                  currentUser={username}
                  isEditing={isEditingFavorites}
                />
              ) : (
                <Navigate to="/words" replace />
              )
            }
          />
          <Route path="/words" element={<WordsPage />} />
          <Route path="/phrases" element={<PhrasesPage />} />
          <Route path="/listening" element={<ListeningPage />} />
        </Routes>
      </div>
    </div>
  );
}