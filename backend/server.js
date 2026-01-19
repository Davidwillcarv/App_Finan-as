const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Padrão XAMPP
  database: 'finance_db',
});

db.connect((err) => {
  if (err) console.error('ERRO MYSQL:', err);
  else console.log('CONECTADO AO BANCO COM SUCESSO');
});

// LOGIN: MANTIDA a consulta na tabela 'users'
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // buscamos o usuario no banco de dados

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(sql, [email, password], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) {
      // No seu server.js, dentro de app.post('/login', ...)
      res.json({
        success: true,
        user: { name: data[0].name, email: data[0].email },
      });
    } else {
      return res.json({
        success: false,
        message: 'E-mail ou senha incorretos',
      });
    }
  });
});

// LISTAR: Agora filtra pelo email do usuário logado
app.get('/expenses', (req, res) => {
  const { user_email } = req.query; // Recebe o email via URL
  // Agora a busca no MySQL usa o WHERE para filtrar pelo dono da conta
  const sql = 'SELECT * FROM expenses WHERE user_email = ?';

  db.query(sql, [user_email], (err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
});

// ADICIONAR: Restaurado para salvar receitas e despesas
app.post('/expenses', (req, res) => {
  const { description, value, type, user_email } = req.body;

  const sql =
    'INSERT INTO expenses (description, value, type, user_email) VALUES (?, ?, ?, ?)';

  db.query(sql, [description, value, type, user_email], (err, result) => {
    if (err) {
      console.error('Erro ao salvar:', err);
      return res.status(500).send(err);
    }
    res.json({ success: true });
  });
});

// ROTA PARA CADASTRO DE NOVOS USUÁRIOS
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Query para inserir o novo cliente no seu banco de dados
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('Erro no MySQL:', err);
      return res
        .status(500)
        .json({ success: false, message: 'E-mail cadastrado com sucesso!' });
    }
    // Retorna sucesso para o Frontend
    res.json({ success: true });
  });
});

// EXCLUIR: Restaurado para deletar pelo ID corretamente
app.delete('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM expenses WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar:', err);
      return res.status(500).json({ success: false, error: err });
    }
    res.json({ success: true });
  });
});

app.listen(3000, () => console.log('SERVIDOR ON NA PORTA 3000'));
