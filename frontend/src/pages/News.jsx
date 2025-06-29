import { Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsList from "../components/NewsList";

const News = () => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <NewsList />
      </Box>
      <Footer />
    </>
  );
};

export default News; 