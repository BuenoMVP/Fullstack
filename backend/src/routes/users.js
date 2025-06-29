import express from 'express'
import schemaUsers from '../models/Users.js'
import bcrypt from 'bcrypt'
import { authenticateToken } from './login.js'

const router = express.Router()

router.get('/', authenticateToken, async (_req, res) => {
    try {
      const objUsuarios = await schemaUsers.find();

      if (!objUsuarios)
        return res.status(404).json({ msg: "Usuários não encontrados!" });

      res.status(200).send(objUsuarios);
    } catch (error) {
      res.status(400).json({ "Erro ao resgatar usuários": error });
    }
})

router.post('/', async (req, res) => {
    try {
      const usuario = { ...req.body };

      const validUser = await schemaUsers.find({
        email: usuario.email
      })

      if (validUser.length > 0)
        return res.status(400).json({ msg: "Usuário já cadastrado!" });

      const senhaHash = await bcrypt.hash(usuario.senha, 10);

      const novoUsuario = {
        nome: usuario.nome,
        email: usuario.email,
        senha: senhaHash,
      }

      const objUsuario = await schemaUsers.create(novoUsuario);

      if (!objUsuario)
        return res.status(400).json({ msg: "Usuário não criado!" });

      res.status(201).json({ objUsuario, msg: "Usuário criado!" });
    } catch (error) {
      res.status(400).json({ "Erro ao adicionar usuário": error });
    }
})

router.put('/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = { ...req.body };

      const novoUsuario = {
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
      }

      const objUsuario = await schemaUsers.findByIdAndUpdate(id, novoUsuario);

      if (!objUsuario)
        return res.status(404).json({ msg: "Usuário não encontrado!" });

      res.status(200).json({ objUsuario, msg: "Usuário atualizado!" });
    } catch (error) {
      res.status(400).json({ "Erro ao atualizar usuário": error });
    }
})

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;

      const objUsuario = await schemaUsers.findByIdAndDelete(id);

      if (!objUsuario)
        return res.status(404).json({ msg: "Usuário não encontrado!" });

      res.status(200).json({ objUsuario, msg: "Usuário deletado!" });
    } catch (error) {
      res.status(400).json({ "Erro ao deletar usuário": error });
    }
})

export default router