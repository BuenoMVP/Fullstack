import { AppBar, Toolbar, Box, CardMedia, Button, Stack } from "@mui/material";
import { useState } from "react";

import Logo from "../../logo.svg";

const styles = {
  appBar: {
    width: "100%",
    height: "80px",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "center",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "1280px",
    mx: "auto",
    px: 2,
  },
  toolbar: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  logo: {
    height: "56px",
    width: "auto",
    objectFit: "contain",
  },
  languageSwitch: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    padding: "8px",
    borderRadius: "20px",
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
    "&:hover": {
      backgroundColor: "action.hover",
    },
    "&:focus": {
      outline: "none",
    },
  },
  flag: {
    width: "36px",
    height: "25px",
    borderRadius: "4px",
    objectFit: "cover",
    transition: "opacity 0.2s",
  },
  activeFlag: {
    opacity: 1,
  },
  inactiveFlag: {
    opacity: 0.5,
  },
  divider: {
    width: "1px",
    height: "16px",
    backgroundColor: "divider",
  },
};

function LanguageSwitch({ onClick, selectedLanguage }) {

  return (
    <Button onClick={onClick} sx={styles.languageSwitch}>
      <Stack direction="row" spacing={1} alignItems="center">
        <CardMedia
          component="img"
          sx={{
            ...styles.flag,
            ...(selectedLanguage === "pt" ? styles.activeFlag : styles.inactiveFlag),
          }}
          image="https://flagcdn.com/w40/br.png"
          alt="Brazil Flag"
        />
        <Box sx={styles.divider} />
        <CardMedia
          component="img"
          sx={{
            ...styles.flag,
            ...(selectedLanguage === "en" ? styles.activeFlag : styles.inactiveFlag),
          }}
          image="https://flagcdn.com/w40/us.png"
          alt="USA Flag"
        />
      </Stack>
    </Button>
  );
}

function Header() {
  const [language, setLanguage] = useState("pt");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Box sx={styles.contentWrapper}>
        <Toolbar disableGutters sx={styles.toolbar}>
            <CardMedia
              component="img"
              sx={styles.logo}
              image={Logo}
              alt="UTFPR Logo"
            />
          <LanguageSwitch onClick={toggleLanguage} selectedLanguage={language} />
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default Header;
