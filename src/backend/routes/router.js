import express from 'express'
import loginRouter from './login.js'

const router = express.Router()

router.use('/login', loginRouter)

router.get('/', (_req, res) => {
    res.send('Página inicial da api')
})

export default router