const API_URL = 'http://localhost:3333'

// credenciais FIXAS do mock
const MOCK_USER = {
  email: 'admin@teste.com',
  password: '123456'
}

let mockExpenses = [
  { id: 1, title: 'Aluguel', amount: 1200 },
  { id: 2, title: 'Mercado', amount: 450 }
]

export async function apiFetch(path, options = {}) {
  // ===== MOCK DE LOGIN =====
  if (path === '/login') {
    const body = JSON.parse(options.body || '{}')

    if (
      body.email === MOCK_USER.email &&
      body.password === MOCK_USER.password
    ) {
      localStorage.setItem('token', 'fake-token')
      return { token: 'fake-token' }
    }

    throw new Error('Email ou senha inválidos')
  }

  // ===== PROTEÇÃO =====
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Não autorizado')
  }

  // ===== MOCK GET EXPENSES =====
  if (path === '/expenses' && (!options.method || options.method === 'GET')) {
    return mockExpenses
  }

  // ===== MOCK POST EXPENSE =====
  if (path === '/expenses' && options.method === 'POST') {
    const body = JSON.parse(options.body || '{}')

    if (!body.title || !body.amount) {
      throw new Error('Dados inválidos')
    }

    const newExpense = {
      id: Date.now(),
      title: body.title,
      amount: Number(body.amount)
    }

    mockExpenses.push(newExpense)
    return newExpense
  }

  throw new Error('Rota não encontrada')
}
