import prisma from '../config/prisma.js'

export async function addExpense(req, res) {
  try {
    const { value, category } = req.body
    const userId = req.userId

    const expense = await prisma.expense.create({
      data: {
        value: Number(value),
        category,
        userId
      }
    })

    res.status(201).json(expense)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
