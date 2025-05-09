import { useEffect, useReducer } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import NewsList from "./components/NewsList";

import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const reducer = (state, action) => {
  switch (action.type) {
    case "setNews":
      return { ...state, news: action.payload };
    case "setPage":
      return { ...state, page: action.payload };
    case "setLimit":
      return { ...state, limit: action.payload };
    default:
      return "This is not a valid action";
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    news: [],
    page: 1,
    limit: 3,
  });

  useEffect(() => {
    const API_KEY = "MuitxGgnsGvxDGNOagzwSKuDCu0GSBhMBDzoY2YW";
    const apiUrl = `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&search=UTFPR&limit=${state.limit}&page=${state.page}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        return response.json();
      })
      .then((responseJSON) => {
        if (!responseJSON.data) throw responseJSON;
        const newsArray = responseJSON.data;
        dispatch({ type: "setNews", payload: newsArray });
      })
      .catch((error) => {
        console.error("Erro", error);
      });
  }, [state.limit, state.page]);

  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <Header />
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Box
            component="main"
            sx={{ flex: 1, py: 4, display: "flex", justifyContent: "center" }}
          >
            <NewsList newsList={state.news} />
          </Box>
        </Box>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
