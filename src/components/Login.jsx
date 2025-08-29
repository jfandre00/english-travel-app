import React, { useState } from "react";

export default function Login({ onLogin, onSkip, loginFailed }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <img
        className="imgTeacher"
        src="https://teacherdenise.com/img/logo.JPG"
        alt="Teacher Denise Logo"
        style={{ display: "block", margin: "0 auto", padding: 10 }}
      />
      <h2>Teacher Denise's Travel App</h2>
      <p style={{ marginTop: 10, marginBottom: 10 }}>
        Digite o usuário para acessar a área VIP:
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="coloque kennedy p/ acessar"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
          required
        />
        <div style={{ marginTop: "10px" }}>
          <button
            type="submit"
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              backgroundColor: "#007bff",
            }}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={onSkip}
            style={{
              padding: "8px 16px",
              backgroundColor: "#b30000",
              color: "white",
            }}
          >
            Acessar sem login
          </button>
        </div>
      </form>
      {loginFailed && (
        <p style={{ color: "red", marginTop: "10px" }}>Nome não autorizado.</p>
      )}
    </div>
  );
}
