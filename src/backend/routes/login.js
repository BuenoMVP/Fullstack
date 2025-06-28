import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send('Login')
})

router.post('/', (req, res) => {
    res.send('Requisição POST recebida')
})

router.put('/', (req, res) => {
    res.send('Login atualizado')
})

router.delete('/', (req, res) => {
    res.send('Login deletado')
})

export default router