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
} from "@mui/material";
import { useContext, useEffect, useReducer, useState  } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { LanguageContext } from "../../contexts/LanguageContext";
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
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setNews":
      return { ...state, news: action.payload };
    case "setPage":
      return { ...state, page: action.payload };
    case "setTabs":
      return { ...state, tabs: Math.ceil(action.payload / 3) };
    default:
      return "This is not a valid action";
  }
};

function NewsList() {
  const { language } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSearch = () => {
    if (searchTerm.length > 0 && searchTerm.length < 3) {
      setShowError(true);
      return;
    }

    // onSearch(searchTerm);
  };

  const [state, dispatch] = useReducer(reducer, {
    news: [],
    page: 1,
    tabs: 1,
  });

  useEffect(() => {
    const API_KEY = "MuitxGgnsGvxDGNOagzwSKuDCu0GSBhMBDzoY2YW";
    const apiUrl = `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&search=UTFPR&page=${state.page}&language=${language}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição"); 
        }
        return response.json();
      })
      .then((responseJSON) => {
        if (!responseJSON.data) throw responseJSON;
        dispatch({ type: "setTabs", payload: responseJSON.meta.found });
        const newsArray = responseJSON.data;
        dispatch({ type: "setNews", payload: newsArray });
      })
      .catch((error) => {
        console.error("Erro", error);
      });
  }, [state.page, language]);

  const mainNews = state.news[0];
  const secondaryNewsList = state.news.length > 1 ? state.news.slice(1) : [];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={content.search[language]}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "grey.500" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={content.search[language]}
                    sx={{
                      backgroundColor: "#242424",
                      borderRadius: "50%",
                      "&:hover": {
                        backgroundColor: "#242424",
                        opacity: "0.9",
                      },
                    }}
                    onClick={handleSearch}
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
              "& fieldset": {
                borderColor: "grey.300",
              },
              "&:hover fieldset": {
                borderColor: "grey.400",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
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

      {state.news.length > 0 ? (
        <>
          <Card sx={{ mb: 4 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                image={mainNews.image_url}
                alt={mainNews.title}
              />
              <CardContent>
                <Typography variant="h4" component="h1" gutterBottom>
                  {mainNews.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  {mainNews.date}
                </Typography>
                <Typography variant="body1">{mainNews.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {secondaryNewsList.length > 0 ? (
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
                {secondaryNewsList.map((news, index) => (
                  <Grid item size={{ xs: 12, sm: 6 }} key={index}>
                    <NewsCard {...news} />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : null}

          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              variant="outlined"
              count={state.tabs}
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
                  "&:hover": {
                    color: "white",
                    borderColor: "white",
                  },
                  "&.Mui-selected": {
                    color: "white",
                    borderColor: "white",
                    "&:hover": {
                      color: "white",
                      borderColor: "white",
                    },
                  },
                },
              }}
            />
          </Box>
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
