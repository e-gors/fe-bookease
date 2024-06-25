import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { TextButton, OutlinedButton } from "../components/CustomButtons";
import { useHistory, useLocation } from "react-router-dom";

const pages = ["Home", "Services", "About", "Contact", "Blog"];

function PublicAppBar() {
  const history = useHistory();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Extract the pathname without the leading slash
  const currentPath = location.pathname.slice(1).toLowerCase();
  const initialPage =
    pages.find((page) => page.toLowerCase() === currentPath) || "Home";
  const [selectedPage, setSelectedPage] = React.useState(initialPage);

  const handleOpenNavMenu = () => {
    setDrawerOpen(true);
  };

  const handleCloseNavMenu = () => {
    setDrawerOpen(false);
  };

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      const offset = -60; // Adjust the offset value as needed
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  

  const handlePageClick = (page) => {
    setSelectedPage(page);

    if (currentPath === "login" || currentPath === "signup") {
      // Redirect to homepage with the section hash
      // history.push(`/#${page.toLowerCase()}`);
      history.push("/");
    } else {
      // Scroll to section if already on homepage
      scrollToSection(page.toLowerCase());
    }
    setDrawerOpen(false);
  };

  const handleNavigate = (link) => {
    history.push(link);
  };

  React.useEffect(() => {
    const unlisten = history.listen((location) => {
      if (location.hash) {
        const section = location.hash.slice(1);
        scrollToSection(section);
        setSelectedPage(pages.find(page => page.toLowerCase() === section) || "Home");
      }
    });

    if (currentPath && currentPath !== "login" && currentPath !== "signup") {
      scrollToSection(currentPath);
      setSelectedPage(pages.find(page => page.toLowerCase() === currentPath) || "Home");
    }

    return () => {
      unlisten();
    };
  }, [history, currentPath]);

  return (
    <AppBar
      enableColorOnDark
      position="sticky"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        backdropFilter: "blur(10px)",
        color: "black",
        height: 60,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            minHeight: 60,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Outfit",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Efren
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleCloseNavMenu}
              sx={{ width: "50%" }}
              PaperProps={{
                sx: { width: "50%" },
              }}
            >
              <List>
                {pages.map((page) => (
                  <ListItem key={page} disablePadding>
                    <ListItemButton
                      onClick={() => handlePageClick(page)}
                      sx={{
                        backgroundColor:
                          currentPath !== "login" && selectedPage === page
                            ? "#FE9D8C"
                            : "transparent",
                        "&:hover": {
                          backgroundColor:
                            currentPath !== "login" && selectedPage === page
                              ? "#FE9D8C"
                              : "#FFD1C0",
                        },
                      }}
                    >
                      <ListItemText primary={page} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  mx: 2,
                  textTransform: "none",
                  backgroundColor:
                    currentPath !== "login" && selectedPage === page
                      ? "#FE9D8C"
                      : "transparent",
                  "&::first-letter": {
                    textTransform: "uppercase",
                  },
                  "&:hover": {
                    backgroundColor: "#FE9D8C",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Stack direction="row" spacing={1}>
            <TextButton variant="text" onClick={() => handleNavigate("/login")}>
              Login
            </TextButton>
            <OutlinedButton variant="outlined">Sign Up Now</OutlinedButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default PublicAppBar;
