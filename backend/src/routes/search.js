import express from 'express'
import schemaNews from '../models/News.js'
import { logActivity } from '../config/logger.js'
import { cacheMiddleware } from '../config/cache.js'
import { authenticateToken } from './login.js'

const router = express.Router()

router.get('/', authenticateToken, cacheMiddleware(300), async (req, res) => {
    const limit = 3
    const offset = parseInt(req.query.offset) || 0
    const titulo = req.query.titulo || ''
    const lingua = req.query.lingua || 'pt'

    try {
      const query = { lingua: lingua }
      
      if (titulo) {
        query.$and = [
          { lingua: lingua },
          {
            $or: [
              { titulo: { $regex: titulo, $options: 'i' } },
              { descricao: { $regex: titulo, $options: 'i' } },
              { link: { $regex: titulo, $options: 'i' } }
            ]
          }
        ]
        delete query.lingua
      }

      const objNews = await schemaNews.find(query)
        .sort({ data: -1 })
        .skip(offset)
        .limit(limit)

      let total = await schemaNews.countDocuments(query)
      const url = req.baseUrl

      const next = offset + limit < total ? `${url}?titulo=${titulo}&offset=${offset + limit}` : 'null'
      const previous = offset - limit >= 0 ? `${url}?titulo=${titulo}&offset=${offset - limit}` : 'null'

      if (total > 0 && objNews) {
        logActivity('NEWS_SEARCH', { query: titulo, results: total, offset, ip: req.ip });
        res.status(200).json({
          total,
          next,
          previous,
          results: objNews
        });
      } else {
        res.status(404).json({ msg: "Notícias não encontradas!" });
      }
    } catch (error) {
      res.status(400).json({ "Erro ao resgatar notícias": error });
    }
})

export default router