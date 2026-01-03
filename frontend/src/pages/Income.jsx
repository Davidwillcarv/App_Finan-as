import { useState } from 'react'
import Layout from '../components/Layout'
import { useFinance } from '../context/FinanceContext'
import './FinancePages.css'

export default function Income() {
  const { incomes, addIncome } = useFinance()
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!title || !amount) return

    addIncome({
      id: Date.now(),
      title,
      amount: Number(amount)
    })

    setTitle('')
    setAmount('')
  }

  return (
    <Layout>
      <div className="finance-page">
        <h1>Receitas</h1>

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

            <button className="primary">Adicionar receita</button>
          </form>
        </section>

        <section className="list-grid">
          {incomes.map(i => (
            <div key={i.id} className="card item-card income">
              <div className="item-info">
                <strong>{i.title}</strong>
              </div>
              <div className="item-value positive">
                + R$ {i.amount}
              </div>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}
