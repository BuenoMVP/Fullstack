import { Box, Container, Typography } from "@mui/material";
import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";

const content = {
  en: "© 2025 UTFPR News. All rights reserved.",
  pt: "© 2025 UTFPR News. Todos os direitos reservados.",
};

const styles = {
  footer: {
    width: "100%",
    py: 3,
    backgroundColor: "white",
    color: (theme) => theme.palette.grey[900],
  },
};


function Footer() {
  const { language } = useContext(LanguageContext);

  return (
    <Box component="footer" sx={styles.footer}>
      <Container maxWidth="xl">
        <Typography variant="body2" align="center">
          {content[language]}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
