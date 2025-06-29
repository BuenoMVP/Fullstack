import express from 'express'
import usersRouter from './users.js'
import newsRouter from './news.js'
import searchRouter from './search.js'
import loginRouter from './login.js'

const router = express.Router()

router.use('/login', loginRouter)

router.use('/users', usersRouter)

router.use('/news', newsRouter)

router.use('/search', searchRouter)

router.get('/', (_req, res) => {
    res.json({ msg: 'API funcionando. Use /login para autenticar.' })
})

export default router