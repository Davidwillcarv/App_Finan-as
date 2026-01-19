import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FinancePages.css";

export default function Dashboard() {
  const [data, setData] = useState({
    expenses: [],
    totalExpenses: 0,
    totalIncome: 0,
  });
  const [loading, setLoading] = useState(true);

  // 1. Criamos apenas UM estado para o nome
  const [userName, setUserName] = useState("Usuário");
  const navigate = useNavigate();

  async function loadData() {
    try {
      // 2. Buscamos o nome e o email salvos no momento do login
      const emailSalvo = localStorage.getItem("userEmail");
      const nomeSalvo = localStorage.getItem("userName");

      // 3. Atualizamos o nome na tela IMEDIATAMENTE
      if (nomeSalvo) {
        setUserName(nomeSalvo);
      }

      const response = await fetch(
        `http://localhost:3000/expenses?user_email=${emailSalvo}`,
      );
      const expenses = await response.json();

      if (expenses) {
        const totalInc = expenses
          .filter((i) => i.type === "INCOME")
          .reduce((acc, c) => acc + Number(c.value), 0);

        const totalExp = expenses
          .filter((i) => i.type === "EXPENSE")
          .reduce((acc, c) => acc + Number(c.value), 0);

        setData({ expenses, totalExpenses: totalExp, totalIncome: totalInc });
      }
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja excluir este item?")) return;
    try {
      const response = await fetch(`http://localhost:3000/expenses/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setData((prev) => ({
          ...prev,
          expenses: prev.expenses.filter((item) => item.id !== id),
        }));
      }
    } catch (err) {
      console.error("Erro de conexão", err);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="user-profile">
          <div className="avatar-box">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <p className="user-name">{userName}</p>
        </div>

        <nav
          className="nav-menu"
          style={{ display: "flex", flexDirection: "column", height: "80vh" }}
        >
          <button className="nav-btn active">Resumo</button>
          <button
            className="nav-btn btn-success-text"
            onClick={() => navigate("/receita/nova")}
          >
            + Receita
          </button>
          <button
            className="nav-btn btn-danger-text"
            onClick={() => navigate("/novo")}
          >
            - Despesa
          </button>

          <button
            className="nav-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            style={{
              marginTop: "auto",
              color: "#ff4d4d",
              fontWeight: "bold",
              border: "1px solid #ff4d4d",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            Sair do App
          </button>
        </nav>
      </aside>

      <main className="content">
        <header className="main-header">
          <h1>Painel Financeiro</h1>
          <p><strong>Bem-vindo de volta,</strong> {userName}!</p>
        </header>

        <section className="summary-cards">
          <div className="card shadow-light">
            <span className="label">SALDO DISPONÍVEL</span>
            <p className="value" style={{ color: "#28a745" }}>
              R$ {(data.totalIncome - data.totalExpenses).toFixed(2)}
            </p>
          </div>
          <div className="card shadow-light">
            <span className="label">RECEITAS</span>
            <p className="value val-success">
              R$ {data.totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="card shadow-light">
            <span className="label">DESPESAS</span>
            <p className="value val-danger">
              R$ {data.totalExpenses.toFixed(2)}
            </p>
          </div>
        </section>

        <div
          className="card shadow-light list-container"
          style={{ marginTop: "20px" }}
        >
          <h3>Atividades Recentes</h3>
          <div className="transaction-list">
            {data.expenses.map((item) => (
              <div key={item.id} className="transaction-card">
                <span className="item-name">{item.description}</span>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span
                    className={
                      item.type === "INCOME" ? "txt-success" : "txt-danger"
                    }
                  >
                    R$ {Number(item.value).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="delete-btn"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
