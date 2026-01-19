# 💰 FinanceApp - Gestão Financeira Pessoal
### Desenvolvido por: **David Willian**

Este é um projeto Full Stack focado em organização financeira, integrando React, Node.js e MySQL.

---

## 🚀 Funcionalidades Técnicas

* Autenticação Segura: Login validado contra banco de dados.
* Filtro de Sessão: Identifica o usuário logado via localStorage.
* Cálculo de Saldo Automático: Processa dinamicamente Receitas vs Despesas.

---

## 🛠️ Como Instalar e Executar

### 1. Banco de Dados (MySQL)
Crie o banco `finance_db` e as tabelas:

CREATE DATABASE finance_db;
USE finance_db;
CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255));
CREATE TABLE expenses (id INT AUTO_INCREMENT PRIMARY KEY, description VARCHAR(255), amount DECIMAL(10,2), type ENUM('receita', 'despesa'), user_email VARCHAR(255), FOREIGN KEY (user_email) REFERENCES users(email));

### 2. Backend
cd backend
npm install
node server.js

### 3. Frontend
cd frontend
npm install
npm run dev

---

## 📂 Estrutura
* /frontend: Interface React.
* /backend: API e Conexão MySQL.

Desenvolvido por David Willian.
