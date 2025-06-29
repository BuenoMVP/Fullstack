import express from 'express'
import schemaNews from '../models/News.js'

const router = express.Router()

router.get('/', async (_req, res) => {
    try {
      const objNews = await schemaNews.find();

      if (!objNews)
        return res.status(404).json({ msg: "Noticias não encontrados!" });

      res.status(200).send(objNews);
    } catch (error) {
      res.status(400).json({ "Erro ao resgatar noticias": error });
    }
})

router.post('/list', async (req, res) => {
  console.log("Rota /list chamada com dados:", req.body);
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
            descricao: noticia.descricao
          });
        }
      }

      const objNews = await schemaNews.insertMany(noticiasParaCriar);

      res.status(201).json({ 
        criadas: objNews.length, 
        duplicadas: noticias.length - objNews.length
      });
    } catch (error) {
      res.status(400).json({ "Erro ao adicionar notícias": error });
    }
})

router.post('/', async (req, res) => {
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
        descricao: noticia.descricao
      }

      const objNews = await schemaNews.create(novaNoticia);

      if (!objNews)
        return res.status(400).json({ msg: "Noticia não criada!" });

      res.status(201).json({ objNews, msg: "Noticia criada!" });
    } catch (error) {
      res.status(400).json({ "Erro ao adicionar noticia": error });
    }
})

router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const noticia = { ...req.body };

      const novaNoticia = {
        titulo: noticia.titulo,
        data: noticia.data,
        link: noticia.link,
        imagem: noticia.imagem,
        descricao: noticia.descricao
      }

      const objNews = await schemaNews.findByIdAndUpdate(id, novaNoticia);

      if (!objNews)
        return res.status(404).json({ msg: "Noticia não encontrada!" });

      res.status(200).json({ objNews, msg: "Noticia atualizada!" });
    } catch (error) {
      res.status(400).json({ "Erro ao atualizar noticia": error });
    }
})

router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const objNews = await schemaNews.findByIdAndDelete(id);

      if (!objNews)
        return res.status(404).json({ msg: "Noticia não encontrada!" });

      res.status(200).json({ objNews, msg: "Noticia deletada!" });
    } catch (error) {
      res.status(400).json({ "Erro ao deletar noticia": error });
    }
})

export default router