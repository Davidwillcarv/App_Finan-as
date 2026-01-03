import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './config/prisma.js'


export async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { userId: user.id },              // 👈 CONTRATO COM O MIDDLEWARE
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  return res.json({ token })
}
