import express from 'express'
import schemaUsers from '../models/Users.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()

const loginAttempts = new Map()
const MAX_ATTEMPTS = 5
const BLOCK_TIME = 15 * 60 * 1000

const rateLimiter = (req, res, next) => {
  const ip = req.ip
  const now = Date.now()
  
  if (!loginAttempts.has(ip)) {
    loginAttempts.set(ip, { count: 0, lastAttempt: now })
  }
  
  const attempts = loginAttempts.get(ip)
  
  if (attempts.count >= MAX_ATTEMPTS && (now - attempts.lastAttempt) < BLOCK_TIME) {
    return res.status(429).json({ msg: "Muitas tentativas. Tente novamente em 15 minutos." })
  }
  
  if ((now - attempts.lastAttempt) > BLOCK_TIME) {
    attempts.count = 0
  }
  
  next()
}

router.post('/', rateLimiter, async (req, res) => {
  try {
    const { email, senha } = req.body
    const ip = req.ip

    if (!email || !senha) {
      return res.status(400).json({ msg: "Email e senha são obrigatórios" })
    }

    const usuario = await schemaUsers.findOne({ email })
    
    if (!usuario) {
      const attempts = loginAttempts.get(ip)
      attempts.count++
      attempts.lastAttempt = Date.now()
      return res.status(401).json({ msg: "Credenciais inválidas" })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    
    if (!senhaValida) {
      const attempts = loginAttempts.get(ip)
      attempts.count++
      attempts.lastAttempt = Date.now()
      return res.status(401).json({ msg: "Credenciais inválidas" })
    }

    loginAttempts.delete(ip)

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.VITE_JWT_SECRET || 'fullstack_secret',
      { expiresIn: '1h' }
    )

    res.status(200).json({
      msg: "Login realizado com sucesso",
      token
    })

  } catch (error) {
    res.status(500).json({ msg: "Erro interno do servidor" })
  }
})

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ msg: "Token de acesso requerido" })
  }

  jwt.verify(token, process.env.VITE_JWT_SECRET || 'fallback_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "Token inválido ou expirado" })
    }
    req.user = user
    next()
  })
}

export default router