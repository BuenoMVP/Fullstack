
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

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <Header />
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Box component="main" sx={{ flex: 1, py: 4 }}>
            <NewsList />
          </Box>
        </Box>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
