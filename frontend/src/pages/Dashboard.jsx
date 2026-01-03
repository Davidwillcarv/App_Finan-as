import Layout from '../components/Layout'
import FinanceChart from '../components/FinanceChart'
import { useFinance } from '../context/FinanceContext'

export default function Dashboard() {
  const { expenses, incomes, limit } = useFinance()

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0)
  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0)
  const balance = totalIncome - totalExpenses

  return (
    <Layout>
      <h1>Dashboard</h1>

      <section className="dashboard-grid">
        <Card title="Receitas" value={totalIncome} color="green" />
        <Card title="Despesas" value={totalExpenses} color="red" />
        <Card title="Saldo" value={balance} color="blue" />
        <Card title="Limite" value={limit || '—'} />
      </section>

      <section className="chart-wrapper">
        <FinanceChart />
      </section>
    </Layout>
  )
}

function Card({ title, value, color }) {
  return (
    <div className={`card ${color}`}>
      <span>{title}</span>
      <strong>R$ {value}</strong>
    </div>
  )
}
