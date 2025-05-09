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
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useState } from "react";
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

function NewsList({ newsList, tabs, page, onPageChange, onSearch }) {
  const { language } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSearch = () => {
    if (searchTerm.length > 0 && searchTerm.length < 3) {
      setShowError(true);
      return;
    }

    onSearch(searchTerm);
  };

  const mainNews = newsList[0];
  const secondaryNewsList = newsList.length > 1 ? newsList.slice(1) : [];

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
