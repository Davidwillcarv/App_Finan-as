import prisma from '../config/prisma.js'

export async function getMonthlySummary(req, res) {
  const userId = req.userId

  const expenses = await prisma.expense.findMany({ where: { userId } })
  const user = await prisma.user.findUnique({ where: { id: userId } })

  const totalSpent = expenses.reduce((acc, e) => acc + e.value, 0)
  const remaining = user.monthlyIncome - totalSpent
  const dailyLimit = remaining / 30

  res.json({
    totalSpent,
    remaining,
    dailyLimit
  })
}
