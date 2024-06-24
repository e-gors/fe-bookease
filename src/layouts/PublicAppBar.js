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
import { useHistory } from "react-router-dom";

const pages = ["Home", "About", "Services", "Contact", "Blog"];

function PublicAppBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedPage, setSelectedPage] = React.useState("Home");

  const history = useHistory();

  const handleOpenNavMenu = () => {
    setDrawerOpen(true);
  };

  const handleCloseNavMenu = () => {
    setDrawerOpen(false);
  };

  const handlePageClick = (page) => {
    setSelectedPage(page);
    setDrawerOpen(false);
  };

  const handleNavigate = (link) => {
    history.push(link);
  };

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
                          selectedPage === page ? "#FE9D8C" : "transparent",
                        "&:hover": {
                          backgroundColor:
                            selectedPage === page ? "#FE9D8C" : "#FFD1C0",
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
                    selectedPage === page ? "#FE9D8C" : "transparent",
                  "&::first-letter": {
                    textTransform: "uppercase",
                  },
                  "&:hover": {
                    backgroundColor: "#FE9D8C",
                  },
                }}
              >
                {page.toLowerCase()}
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
