import { Router } from 'express'
import { createAnonymousUser } from '../controllers/auth.controller.js'

const router = Router()
router.post('/anonymous', createAnonymousUser)

export default router
