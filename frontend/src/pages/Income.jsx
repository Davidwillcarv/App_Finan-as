import React, { useState } from 'react';
import { apiFetch } from '../services/api';
import './FinancePages.css';

export default function Income() {
  const [formData, setFormData] = useState({
    description: '',
    value: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // O segredo está aqui: enviamos 'INCOME' explicitamente
      await apiFetch('/expenses', {
        method: 'POST',
        body: JSON.stringify({ 
          ...formData, 
          value: Number(formData.value), 
          type: 'INCOME' 
        }),
      });
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Erro ao salvar receita.');
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="content">
        <div className="card shadow-light" style={{maxWidth: '500px', margin: '40px auto'}}>
          <h2 className="val-success">💰 Adicionar Receita</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="label">Descrição</label>
              <input type="text" placeholder="Ex: Salário" className="input-field"
                onChange={e => setFormData({...formData, description: e.target.value})} required />
            </div>
            <div className="input-group">
              <label className="label">Valor (R$)</label>
              <input type="number" step="0.01" placeholder="0.00" className="input-field"
                onChange={e => setFormData({...formData, value: e.target.value})} required />
            </div>
            <button type="submit" className="nav-btn active main-action">Salvar Receita</button>
            <button type="button" className="nav-btn" onClick={() => window.location.href='/dashboard'}>Voltar</button>
          </form>
        </div>
      </div>
    </div>
  );
}