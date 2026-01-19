# 💰 App Finanças - Controle Pessoal

Sistema completo de gestão financeira com autenticação de utilizadores, dashboard de resumo e controlo de transações (Receitas/Despesas).

## 🚀 Funcionalidades
* **Autenticação Segura**: Login validado contra base de dados MySQL.
* **Dashboard Dinâmico**: Visualização de Saldo, Receitas e Despesas totais.
* **Filtro por Utilizador**: Cada utilizador vê apenas os seus próprios dados financeiros.
* **Gestão de Transações**: Adicionar e excluir registos em tempo real com atualização do saldo.

## 🛠️ Tecnologias Utilizadas
* **Frontend**: React.js, Vite, React Router DOM.
* **Backend**: Node.js, Express.js.
* **Base de Dados**: MySQL.
* **Estilização**: CSS3 Customizado.

## 📋 Pré-requisitos
* Node.js instalado.
* Servidor MySQL (XAMPP/Workbench) ativo.

## 🔧 Configuração e Instalação

### 1. Base de Dados
Importe a estrutura das tabelas `users` e `expenses` no seu MySQL.

### 2. Backend
```bash
cd backend
npm install
node server.js
