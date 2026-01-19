import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinancePages.css'; 

export default function AddDespesa() {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  // Busca o nome e email do usuário logado
  const userName = localStorage.getItem("userName") || "Usuário";
  const user_email = localStorage.getItem('userEmail');

  const handleSave = async (e) => {
    e.preventDefault();

    // Verificação de segurança
    if (!user_email) {
      alert("Erro: Sessão expirada. Faça login novamente.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: description, // Enviando as chaves que o SQL espera
          value: parseFloat(value),
          type: 'EXPENSE',           // Força o tipo como Despesa
          user_email: user_email     // Vincula ao dono da conta
        })
      });

      if (response.ok) {
        navigate('/dashboard'); // Redireciona após sucesso
      } else {
        alert("Erro ao salvar despesa no servidor.");
      }
    } catch (error) {
      console.error("Erro ao conectar:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="user-profile">
          <div className="avatar-box">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <p className="user-name">{userName}</p>
        </div>
        <nav className="nav-menu">
          <button className="nav-btn" onClick={() => navigate('/dashboard')}>
            Voltar ao Resumo
          </button>
        </nav>
      </aside>

      <main className="content">
        <header className="main-header">
          <h1>Nova Despesa</h1>
          <p>Registre seus gastos para manter o saldo atualizado.</p>
        </header>

        <div className="card shadow-light" style={{ maxWidth: '500px', margin: '40px auto', padding: '30px' }}>
          <form onSubmit={handleSave} className="finance-form">
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Descrição</label>
              <input 
                type="text" 
                placeholder="Ex: Aluguel, Internet..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Valor R$</label>
              <input 
                type="number" 
                step="0.01"
                placeholder="0,00"
                value={value}
                onChange={e => setValue(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button type="submit" className="nav-btn" style={{ flex: 2, background: '#dc3545', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                Confirmar Gasto
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