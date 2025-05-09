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
import { useContext } from "react";
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

function NewsList({ newsList, tabs, page, onPageChange }) {
  const { language } = useContext(LanguageContext);

  const mainNews = newsList[0];
  const secondaryNewsList = newsList.length > 1 ? newsList.slice(1) : [];

  return (
    <Container maxWidth="lg">
      {newsList.length > 0 ? (
        <>
          <Card sx={{ mb: 4 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                objectFit="cover"
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
              count={tabs}
              page={page}
              onChange={onPageChange}
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
