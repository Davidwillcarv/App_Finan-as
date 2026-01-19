import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddReceita from "./pages/AddReceita";
import AddDespesa from "./pages/AddDespesa";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem("userEmail", email); // Guarda o email no navegador
        onLogin(true); // Marca como logado
        navigate("/dashboard");
      } else {
        alert("E-mail ou senha incorretos no banco!");
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor!");
    }
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
        <h2 style={{ color: "#2d3367" }}>FinanceApp</h2>
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
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
            Entrar
          </button>
        </form>
        <div
          style={{
            marginTop: "20px",
            fontSize: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <p style={{ margin: 0 }}>
            Não tem uma conta?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                color: "#2d3367",
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Cadastre-se aqui
            </span>
          </p>
          <p style={{ margin: 0 }}>
            <span
              onClick={() => navigate("/recuperar-senha")}
              style={{ color: "#666", cursor: "pointer", fontSize: "12px" }}
            >
              Esqueci minha senha
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />{" "}
        {/* Usa o import Register */}
        <Route path="/recuperar-senha" element={<ForgotPassword />} />{" "}
        {/* Usa o import ForgotPassword */}
        {/* Rotas protegidas ou diretas */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/receita/nova" element={<AddReceita />} />
        <Route path="/novo" element={<AddDespesa />} />
        {/* Redireciona qualquer rota errada para o login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
