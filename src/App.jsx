import { useEffect } from 'react'
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


function App() {
  useEffect(() => {
    const text = document.getElementById('api-content')
    const API_KEY = 'O0jp6kdnPaGPOfJxI1NFDlzjAHiGavEG5ZUVMEeC'
    const apiUrl = `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&search=UTFPR&limit=1`
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição')
        }
        return response.json()
      })
      .then(responseJSON => {
        console.log(responseJSON.data)
        text.innerHTML = responseJSON['data'][0]['title']
      })
      .catch(error => {
        console.error('Erro', error)
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <h1>Site de Noticias</h1>
      <div className="card">
        <h1>
          Bem vindo à um site muito melhor que o G1 S2
        </h1>
        <p>
          Conteudo da API
        </p>
        <span id='api-content'></span>
      </div>
  
    </ThemeProvider>
  )
}

export default App
