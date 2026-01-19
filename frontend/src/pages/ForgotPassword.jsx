import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de envio de e-mail depois
    alert("Se o e-mail existir, você receberá um link de recuperação.");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f7fe",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          width: "320px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#2d3367" }}>Recuperar Senha</h2>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
          Enviaremos um link para o seu e-mail.
        </p>
        <form
          onSubmit={handleReset}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="email"
            placeholder="Seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#2d3367",
              color: "white",
              padding: "12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Enviar Instruções
          </button>
        </form>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            color: "#2d3367",
            marginTop: "15px",
            cursor: "pointer",
          }}
        >
          Voltar ao Login
        </button>
      </div>
    </div>
  );
}
