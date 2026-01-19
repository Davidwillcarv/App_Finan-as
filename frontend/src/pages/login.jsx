import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // AJUSTE 1: Importar o navigate
import "./login.css";

export default function Login({ onLogin }) {
  // AJUSTE 2: Receber o onLogin aqui
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // AJUSTE 3: Inicializar o navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      console.log("Dados recebidos do servidor:", data);

      if (response.ok && data.success) {
        // Limpa qualquer dado de usuário anterior para não misturar
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");

        // Guarda o email para o Dashboard filtrar os dados
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", data.user.name); // SALVA O NOME DO NOVO CLIENTE

        onLogin(true); // Avisa o App.jsx que o login deu certo
        navigate("/dashboard"); // Redireciona para a tela principal
      } else {
        alert("E-mail ou senha incorretos!");
      }
    } catch (error) {
      alert(
        "Erro ao conectar com o servidor. Verifique se o backend está rodando!",
      );
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Acessar Sistema</h2>
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
