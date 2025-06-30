import {
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Pagination,
  Box,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NewsCard from "../NewsCard";
import IconButton from "@mui/material/IconButton";

const content = {
  otherNews: {
    en: "Other news",
    pt: "Outras notícias",
  },
  noNews: {
    en: "No news found",
    pt: "Nenhuma notícia encontrada",
  },
  search: {
    en: "Search news...",
    pt: "Buscar notícias...",
  },
  searchError: {
    en: "Please enter at least 3 characters to search",
    pt: "Digite pelo menos 3 caracteres para buscar",
  },
  createNews: {
    en: "Create News",
    pt: "Criar Notícia",
  },
  loading: {
    en: "Loading...",
    pt: "Carregando...",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setNews":
      return { ...state, news: action.payload };
    case "setPage":
      return { ...state, page: action.payload };
    case "setTotal":
      return { ...state, total: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

function NewsList() {
  const { language } = useContext(LanguageContext);
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showError, setShowError] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    news: [],
    page: 1,
    total: 0,
    loading: true,
  });

  const handleSearch = () => {
    if (searchValue.length > 0 && searchValue.length < 3) {
      setShowError(true);
      return;
    }
    setSearchTerm(searchValue);
    dispatch({ type: "setPage", payload: 1 });
  };

  useEffect(() => {
    const fetchNews = async () => {
      dispatch({ type: "setLoading", payload: true });

      try {
        const token = getToken();
        const limit = 5;
        const offset = (state.page - 1) * limit;

        const params = new URLSearchParams();
        if (searchTerm) params.append("titulo", searchTerm);
        params.append("lingua", language);
        params.append("offset", offset);

        const url = `${
          import.meta.env.VITE_API_URL
        }/api/search?${params.toString()}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Encoding": "gzip, deflate, br",
            "Cache-Control": "max-age=300",
          },
          cache: "default",
        });

        if (!response.ok) throw new Error("Erro ao buscar notícias");

        const responseData = await response.json();
        
        dispatch({ type: "setNews", payload: responseData.results || [] });
        dispatch({ type: "setTotal", payload: responseData.total || 0 });
        dispatch({ type: "setLoading", payload: false });
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
        dispatch({ type: "setNews", payload: [] });
        dispatch({ type: "setTotal", payload: 0 });
        dispatch({ type: "setLoading", payload: false });
      }
    };

    fetchNews();
  }, [searchTerm, language, state.page, getToken]);

  const mainNews = state.news[0];
  const secondaryNews = state.news.slice(1);
  const totalPages = Math.ceil(state.total / 5);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" sx={{ flex: 1 }}>
        {content.otherNews[language]}
      </Typography>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/create-news")}
          sx={{ ml: 2 }}
        >
          {content.createNews[language]}
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={content.search[language]}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSearch}
                    sx={{
                      backgroundColor: "#242424",
                      borderRadius: "50%",
                      "&:hover": { backgroundColor: "#242424", opacity: "0.9" },
                    }}
                  >
                    <SearchIcon sx={{ color: "white" }} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
              "& fieldset": { borderColor: "grey.300" },
              "&:hover fieldset": { borderColor: "grey.400" },
              "&.Mui-focused fieldset": { borderColor: "primary.main" },
            },
          }}
        />
      </Box>

      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {content.searchError[language]}
        </Alert>
      </Snackbar>

      {state.loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <Typography variant="h6">{content.loading[language]}</Typography>
        </Box>
      ) : state.news.length > 0 ? (
        <>
          <Card
            component="a"
            href={mainNews.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mb: 4, textDecoration: "none", display: "block" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                image={mainNews.imagem}
                alt={mainNews.titulo}
              />
              <CardContent sx={{ backgroundColor: "white" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {mainNews.titulo}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  {mainNews.data}
                </Typography>
                <Typography variant="body1">{mainNews.descricao}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {secondaryNews.length > 0 && (
            <>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ mb: 3 }}
              >
                {content.otherNews[language]}
              </Typography>
              <Grid container spacing={3}>
                {secondaryNews.map((news, index) => (
                  <Grid item size={{ xs: 12, sm: 6 }} key={index}>
                    <NewsCard {...news} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                variant="outlined"
                count={totalPages}
                page={state.page}
                onChange={(event, value) =>
                  dispatch({ type: "setPage", payload: value })
                }
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 4,
                  "& .MuiPaginationItem-root": {
                    color: "grey.400",
                    border: "1px solid grey.400",
                    "&:hover": { color: "white", borderColor: "white" },
                    "&.Mui-selected": { color: "white", borderColor: "white" },
                  },
                }}
              />
            </Box>
          )}
        </>
      ) : (
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          {content.noNews[language]}
        </Typography>
      )}
    </Container>
  );
}

export default NewsList;
