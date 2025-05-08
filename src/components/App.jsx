import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [news, setNews] = useState([{}])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(1)

  const handleNews = (value) => {
    setNews(value)
  }

  const handlePage = (value) => {
    setPage(value)
  }

  const handleLimit = (value) => {
    setLimit(value)
  }

  useEffect(() => {
    const API_KEY = 'O0jp6kdnPaGPOfJxI1NFDlzjAHiGavEG5ZUVMEeC'
    const apiUrl = `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&search=UTFPR&limit=${limit}&page=${page}`

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição')
        }
        return response.json()
      })
      .then(responseJSON => {
        const newsArray = responseJSON.data
        handleNews(newsArray)
      })
      .catch(error => {
        console.error('Erro', error)
      })
  }, [limit, page])

  return (
    <>
      <h1>Site de Noticias</h1>
      <div className="card">
        <h1>
          Bem vindo à um site muito melhor que o G1 S2
        </h1>
        <label htmlFor='page'>Page</label>
        <input
          type='number'
          id='page'
          value={page}
          onChange={(e) => handlePage(e.target.value)}
        />
        <br />
        <label htmlFor='limit'>Limit</label>
        <input
          type='number'
          id='limit'
          value={limit}
          onChange={(e) => handleLimit(e.target.value)}
        />
        <p>
          Conteudo da API
        </p>
        <ul id='api-content'>
          {news.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
