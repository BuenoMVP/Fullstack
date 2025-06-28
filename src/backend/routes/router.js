import express from 'express'
import usersRouter from './users.js'
import newsRouter from './news.js'

const router = express.Router()

router.use('/users', usersRouter)

router.use('/news', newsRouter)

router.get('/', (_req, res) => {
    res.send('Realize o longin')
})

export default router