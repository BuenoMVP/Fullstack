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
} from "@mui/material";
import { useContext, useEffect, useReducer  } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import NewsCard from "../NewsCard";

const content = {
  otherNews: {
    en: "Other news",
    pt: "Outras notícias",
  },
  noNews: {
    en: "No news found",
    pt: "Nenhuma notícia encontrada",
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
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
                '& .MuiPaginationItem-root': {
                  color: 'grey.400',
                  border: '1px solid grey.400',
                  '&:hover': {
                    color: 'white',
                    borderColor: 'white',
                  },
                  '&.Mui-selected': {
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      color: 'white',
                      borderColor: 'white',
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
