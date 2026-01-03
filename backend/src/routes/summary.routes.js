import { Router } from 'express'
import { getMonthlySummary } from '../controllers/summary.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()
router.get('/month', authMiddleware, getMonthlySummary)

export default router
