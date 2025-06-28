import express from 'express'
import usersRouter from './users.js'

const router = express.Router()

router.use('/users', usersRouter)

router.get('/', (_req, res) => {
    res.send('Realize o longin')
})

export default router