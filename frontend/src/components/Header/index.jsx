import {
  AppBar,
  Toolbar,
  Box,
  CardMedia,
  Button,
  Stack,
  Typography,
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useContext, useState } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

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
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mr: 2,
    "@media (max-width: 530px)": {
      display: "none",
    },
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    "@media (max-width: 700px)": {
      display: "none",
    },
  },
  logoutButton: {
    color: "error.main",
    "&:hover": {
      backgroundColor: "error.light",
      color: "white",
    },
  },
  menuButton: {
    display: "none",
    "@media (max-width: 530px)": {
      display: "flex",
    },
  },
  drawerContent: {
    width: 280,
    p: 2,
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
            ...(selectedLanguage === "pt"
              ? styles.activeFlag
              : styles.inactiveFlag),
          }}
          image="https://flagcdn.com/w40/br.png"
          alt="Brazil Flag"
        />
        <Box sx={styles.divider} />
        <CardMedia
          component="img"
          sx={{
            ...styles.flag,
            ...(selectedLanguage === "en"
              ? styles.activeFlag
              : styles.inactiveFlag),
          }}
          image="https://flagcdn.com/w40/us.png"
          alt="USA Flag"
        />
      </Stack>
    </Button>
  );
}

function Header() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static" sx={styles.appBar}>
        <Box sx={styles.contentWrapper}>
          <Toolbar disableGutters sx={styles.toolbar}>
            <CardMedia
              component="img"
              sx={styles.logo}
              image={Logo}
              alt="UTFPR Logo"
            />

            <Box display="flex" alignItems="center" gap="28px">
              <Box sx={styles.userSection}>
                <Box sx={styles.userInfo}>
                  <Typography variant="body2" color="text.secondary">
                    Bem-vindo
                  </Typography>
                  <Typography variant="body1" color="black" fontWeight="medium">
                    {user?.email}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
                  {user?.email?.charAt(0).toUpperCase()}
                </Avatar>
                <Button
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={styles.logoutButton}
                >
                  Sair
                </Button>
              </Box>

              <Box sx={{ "@media (max-width: 530px)": { display: "none" } }}>
                <LanguageSwitch
                  onClick={toggleLanguage}
                  selectedLanguage={language}
                />
              </Box>
            </Box>

            <IconButton
              onClick={toggleDrawer}
              sx={styles.menuButton}
              color="black"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Box>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={styles.drawerContent}>
          <Typography variant="h6" gutterBottom>
            Menu
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Bem-vindo
            </Typography>
            <Typography
              color="black"
              variant="body1"
              fontWeight="medium"
              sx={{ mb: 1 }}
            >
              {user?.email}
            </Typography>
            <Avatar
              sx={{ bgcolor: "primary.main", width: 40, height: 40, mb: 1 }}
            >
              {user?.email?.charAt(0).toUpperCase()}
            </Avatar>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <List>
            <ListItem>
              <LanguageSwitch
                onClick={toggleLanguage}
                selectedLanguage={language}
              />
            </ListItem>
            <ListItem>
              <Button
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={styles.logoutButton}
                fullWidth
              >
                Sair
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
