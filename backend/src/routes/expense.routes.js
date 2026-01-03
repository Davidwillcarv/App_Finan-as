import { Router } from 'express'
import { addExpense } from '../controllers/expense.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()
router.post('/', authMiddleware, addExpense)

export default router
