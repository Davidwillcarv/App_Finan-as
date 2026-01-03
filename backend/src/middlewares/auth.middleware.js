import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token malformed' })
  }

  const [scheme, token] = parts

  if (scheme !== 'Bearer') {
    return res.status(401).json({ error: 'Token malformed' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.userId

    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
