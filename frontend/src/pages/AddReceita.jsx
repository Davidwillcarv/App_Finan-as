import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinancePages.css'; 

export default function AddReceita() {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "Usuário";
  const user_email = localStorage.getItem('userEmail');

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: description,
          value: parseFloat(value),
          type: 'INCOME', // Identifica como RECEITA
          user_email: user_email
        })
      });
      if (response.ok) navigate('/dashboard');
    } catch (error) {
      console.error("Erro ao salvar receita:", error);
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="user-profile">
          <div className="avatar-box">{userName.substring(0, 2).toUpperCase()}</div>
          <p className="user-name">{userName}</p>
        </div>
        <nav className="nav-menu">
          <button className="nav-btn" onClick={() => navigate('/dashboard')}>Voltar ao Resumo</button>
        </nav>
      </aside>

      <main className="content">
        <header className="main-header">
          <h1>Nova Receita</h1>
          <p>Adicione valores que entraram no seu caixa.</p>
        </header>

        <div className="card shadow-light" style={{ maxWidth: '500px', margin: '40px auto', padding: '30px' }}>
          <form onSubmit={handleSave} className="finance-form">
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2d3367' }}>Descrição da Receita</label>
              <input 
                type="text" 
                placeholder="Ex: Salário, Venda, Pix..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2d3367' }}>Valor R$</label>
              <input 
                type="number" 
                step="0.01"
                value={value}
                onChange={e => setValue(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button type="submit" className="nav-btn" style={{ flex: 2, background: '#28a745', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                Confirmar Receita
              </button>
              <button type="button" onClick={() => navigate('/dashboard')} style={{ flex: 1, background: '#f8f9fa', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}