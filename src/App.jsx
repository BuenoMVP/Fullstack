import { useEffect, useReducer } from 'react'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});


const reducer = (state, action) => {
  switch (action.type) {
    case 'setNews':
      return { ...state, news: action.payload }
    case 'setPage':
      return { ...state, page: action.payload }
    case 'setLimit':
      return { ...state, limit: action.payload }
    default:
      return 'This is not a valid action'
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    news: [{}],
    page: 1,
    limit: 1
  })

  useEffect(() => {
    const API_KEY = 'O0jp6kdnPaGPOfJxI1NFDlzjAHiGavEG5ZUVMEeC'
    const apiUrl = `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&search=UTFPR&limit=${state.limit}&page=${state.page}`

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição')
        }
        return response.json()
      })
      .then(responseJSON => {
        const newsArray = responseJSON.data
        dispatch({ type: 'setNews', payload: newsArray })
      })
      .catch(error => {
        console.error('Erro', error)
      })
  }, [state.limit, state.page])

  return (
    <ThemeProvider theme={theme}>
      <h1>Site de Noticias</h1>
      <div className="card">
        <h1>
          Bem vindo à um site muito melhor que o G1 S2
        </h1>                       
        <label htmlFor='page'>Page</label>
        <input
          type='number'
          id='page'
          value={state.page}
          onChange={(e) => dispatch({ type: 'setPage', payload: e.target.value })}
        />
        <br />
        <label htmlFor='limit'>Limit</label>
        <input
          type='number'
          id='limit'
          value={state.limit}
          onChange={(e) => dispatch({ type: 'setLimit', payload: e.target.value })}
        />
        <p>
          Conteudo da API
        </p>
        <ul id='api-content'>
          {state.news.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
  
    </ThemeProvider>
  )
}

export default App
