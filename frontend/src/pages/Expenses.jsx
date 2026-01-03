import { useState } from 'react'
import Layout from '../components/Layout'
import { useFinance } from '../context/FinanceContext'
import './FinancePages.css'

const CATEGORIES = ['Moradia', 'Alimentação', 'Transporte', 'Lazer', 'Outros']

export default function Expenses() {
  const { expenses, addExpense } = useFinance()
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])

  function submit(e) {
    e.preventDefault()
    if (!title || !amount) return

    addExpense({
      id: Date.now(),
      title,
      amount: Number(amount),
      category
    })

    setTitle('')
    setAmount('')
    setCategory(CATEGORIES[0])
  }

  return (
    <Layout>
      <div className="finance-page">
        <h1>Despesas</h1>

        <section className="card form-card">
          <form onSubmit={submit} className="finance-form">
            <input
              placeholder="Descrição"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <input
              type="number"
              placeholder="Valor"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />

            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {CATEGORIES.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <button className="primary">Adicionar despesa</button>
          </form>
        </section>

        <section className="list-grid">
          {expenses.map(e => (
            <div key={e.id} className="card item-card expense">
              <div className="item-info">
                <strong>{e.title}</strong>
                <span className="muted">{e.category}</span>
              </div>
              <div className="item-value negative">
                - R$ {e.amount}
              </div>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}
