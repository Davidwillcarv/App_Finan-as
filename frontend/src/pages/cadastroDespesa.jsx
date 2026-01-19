import React, { useState } from 'react';
import { apiFetch } from '../services/api';
import './FinancePages.css';

export default function CadastroDespesa() {
  const [formData, setFormData] = useState({
    description: '',
    value: '',
    category: 'Outros',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/expenses', {
        method: 'POST',
        body: JSON.stringify({ ...formData, value: Number(formData.value) }),
      });
      alert('Despesa salva com sucesso!');
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Erro ao salvar: ' + err.message);
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="content">
        <header className="main-header">
          <h1>Nova Despesa</h1>
        </header>

        <form className="card" onSubmit={handleSubmit} style={{maxWidth: '500px', marginTop: '20px'}}>
          <div className="input-group">
            <label>Descrição</label>
            <input 
              type="text" 
              placeholder="Ex: Mercado"
              onChange={e => setFormData({...formData, description: e.target.value})}
              required 
            />
          </div>

          <div className="input-group">
            <label>Valor (R$)</label>
            <input 
              type="number" 
              placeholder="0.00"
              onChange={e => setFormData({...formData, value: e.target.value})}
              required 
            />
          </div>

          <div className="input-group">
            <label>Categoria</label>
            <select 
              onChange={e => setFormData({...formData, category: e.target.value})}
              style={{width: '100%', padding: '10px', background: '#2d3748', color: 'white', borderRadius: '8px', border: 'none'}}
            >
              <option value="Alimentação">🍔 Alimentação</option>
              <option value="Transporte">🚗 Transporte</option>
              <option value="Saúde">🏥 Saúde</option>
              <option value="Lazer">🎡 Lazer</option>
              <option value="Outros">💸 Outros</option>
            </select>
          </div>

          <button type="submit" className="nav-btn active" style={{width: '100%', marginTop: '20px'}}>
            Salvar Despesa
          </button>
        </form>
      </div>
    </div>
  );
}