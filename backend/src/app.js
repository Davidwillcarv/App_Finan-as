import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import expenseRoutes from './routes/expense.routes.js'
import summaryRoutes from './routes/summary.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_, res) => res.json({ ok: true }))

app.use('/auth', authRoutes)
app.use('/expenses', expenseRoutes)
app.use('/summary', summaryRoutes)

export default app
