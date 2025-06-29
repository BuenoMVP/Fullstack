import express from 'express'
import schemaNews from '../models/News.js'
import { authenticateToken } from './login.js'
import { logActivity } from '../config/logger.js'

const router = express.Router()

router.get('/', authenticateToken, async (_req, res) => {
    try {
      const objNews = await schemaNews.find();

      if (!objNews)
        return res.status(404).json({ msg: "Noticias não encontrados!" });

      logActivity('NEWS_SEARCH', { count: objNews.length, ip: _req.ip });
      res.status(200).send(objNews);
    } catch (error) {
      res.status(400).json({ "Erro ao resgatar noticias": error });
    }
})

router.post('/list', authenticateToken, async (req, res) => {
    try {
      const noticias = req.body;

      if (!Array.isArray(noticias))
        return res.status(400).json({ msg: "Esperado um array de notícias!" });

      const noticiasParaCriar = [];
      
      for (const noticia of noticias) {
        const validNews = await schemaNews.find({ titulo: noticia.titulo });
        
        if (validNews.length === 0) {
          noticiasParaCriar.push({
            titulo: noticia.titulo,
            data: noticia.data,
            link: noticia.link,
            imagem: noticia.imagem,
            descricao: noticia.descricao,
            lingua: noticia.lingua
          });
        }
      }

      const objNews = await schemaNews.insertMany(noticiasParaCriar);

      logActivity('NEWS_BULK_CREATE', { created: objNews.length, duplicated: noticias.length - objNews.length, ip: req.ip });
      res.status(201).json({ 
        criadas: objNews.length, 
        duplicadas: noticias.length - objNews.length
      });
    } catch (error) {
      res.status(400).json({ "Erro ao adicionar notícias": error });
    }
})

router.post('/', authenticateToken, async (req, res) => {
    try {
      const noticia = { ...req.body };

      const validNews = await schemaNews.find({
        titulo: noticia.titulo
      })

      if (validNews.length > 0)
        return res.status(400).json({ msg: "Noticia já cadastrada!" });

      const novaNoticia = {
        titulo: noticia.titulo,
        data: noticia.data,
        link: noticia.link,
        imagem: noticia.imagem,
        descricao: noticia.descricao,
        lingua: noticia.lingua
      }

      const objNews = await schemaNews.create(novaNoticia);

      if (!objNews)
        return res.status(400).json({ msg: "Noticia não criada!" });

      logActivity('NEWS_CREATE', { title: novaNoticia.titulo, ip: req.ip });
      res.status(201).json({ objNews, msg: "Noticia criada!" });
    } catch (error) {
      res.status(400).json({ "Erro ao adicionar noticia": error });
    }
})

router.put('/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const noticia = { ...req.body };

      const novaNoticia = {
        titulo: noticia.titulo,
        data: noticia.data,
        link: noticia.link,
        imagem: noticia.imagem,
        descricao: noticia.descricao,
        lingua: noticia.lingua
      }

      const objNews = await schemaNews.findByIdAndUpdate(id, novaNoticia);

      if (!objNews)
        return res.status(404).json({ msg: "Noticia não encontrada!" });

      logActivity('NEWS_UPDATE', { id, ip: req.ip });
      res.status(200).json({ objNews, msg: "Noticia atualizada!" });
    } catch (error) {
      res.status(400).json({ "Erro ao atualizar noticia": error });
    }
})

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;

      const objNews = await schemaNews.findByIdAndDelete(id);

      if (!objNews)
        return res.status(404).json({ msg: "Noticia não encontrada!" });

      logActivity('NEWS_DELETE', { id, ip: req.ip });
      res.status(200).json({ objNews, msg: "Noticia deletada!" });
    } catch (error) {
      res.status(400).json({ "Erro ao deletar noticia": error });
    }
})

export default router