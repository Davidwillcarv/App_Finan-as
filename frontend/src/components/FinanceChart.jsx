import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useFinance } from '../context/FinanceContext'

export default function FinanceChart() {
  const { expenses, incomes } = useFinance()

  const data = [
    { name: 'Receitas', valor: incomes.reduce((s, i) => s + i.amount, 0) },
    { name: 'Despesas', valor: expenses.reduce((s, e) => s + e.amount, 0) }
  ]

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="valor" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
