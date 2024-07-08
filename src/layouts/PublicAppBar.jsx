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
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { TextButton, OutlinedButton } from "../components/CustomButtons";
import { useHistory, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import InfoIcon from "@mui/icons-material/Info";
import BookIcon from "@mui/icons-material/Book";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import LanguagePopover from "./dashboard/common/language-popover";
import NotificationsPopover from "./dashboard/common/notifications-popover";
import AccountPopover from "./dashboard/common/account-popover";
import { isAuth } from "../utils/helpers";
import Logo from "../components/logo";

const pages = [
  {
    icon: <HomeIcon />,
    name: "Home",
  },
  {
    icon: <HomeRepairServiceIcon />,
    name: "Services",
  },
  {
    icon: <InfoIcon />,
    name: "About",
  },
  {
    icon: <BookIcon />,
    name: "Blog",
  },
  {
    icon: <ContactPageIcon />,
    name: "Contact",
  },
];

function PublicAppBar() {
  const history = useHistory();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const currentPath = location.pathname.slice(1).toLowerCase();
  const initialPage =
    pages.find((page) => page.name.toLowerCase() === currentPath) || "Home";
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
      const offset = -60;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handlePageClick = (page) => {
    setSelectedPage(page);
    scrollToSection(page.toLowerCase());
    setDrawerOpen(false);
  };

  const handleNavigate = (link) => {
    history.push(link);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const sectionOffsets = pages.map((page) => {
        const link = page.name;
        const section = document.getElementById(link.toLowerCase());
        return {
          link,
          offsetTop: section?.offsetTop || 0,
        };
      });

      const scrollPosition = window.scrollY + 80;

      for (let i = sectionOffsets.length - 1; i >= 0; i--) {
        if (scrollPosition >= sectionOffsets[i].offsetTop) {
          setSelectedPage(sectionOffsets[i].link);
          break;
        }
      }
    };

    const unlisten = history.listen((location) => {
      if (location.hash) {
        const section = location.hash.slice(1);
        scrollToSection(section);
        setSelectedPage(
          pages.find((page) => page.name.toLowerCase() === section) || "Home"
        );
      }
    });

    if (currentPath && currentPath !== "login" && currentPath !== "register") {
      scrollToSection(currentPath);
      setSelectedPage(
        pages.find((page) => page.name.toLowerCase() === currentPath) || "Home"
      );
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      unlisten();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [history, currentPath]);

  return (
    <AppBar
      enableColorOnDark
      position="fixed"
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
            <Logo sx={{ mr: 1, display: { xs: "none", md: "block" } }} />
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
              <Box sx={{ display: "flex", alignItems: "center", m: 2 }}>
                <Logo sx={{ mr: 1 }} />
              </Box>
              <List>
                {currentPath !== "login" &&
                  currentPath !== "register" &&
                  pages.map((page, i) => (
                    <ListItem key={i} disablePadding>
                      <ListItemButton
                        onClick={() => handlePageClick(page.name)}
                        sx={{
                          backgroundColor:
                            currentPath !== "login" &&
                            selectedPage === page.name
                              ? "#FE9D8C"
                              : "transparent",
                          "&:hover": {
                            backgroundColor:
                              currentPath !== "login" &&
                              selectedPage === page.name
                                ? "#FE9D8C"
                                : "#FFD1C0",
                          },
                        }}
                      >
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        <ListItemText primary={page.name} sx={{ ml: -2 }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                {(currentPath === "login" || currentPath === "register") && (
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigate("/")}>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Home" sx={{ ml: -2 }} />
                    </ListItemButton>
                  </ListItem>
                )}
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
            {currentPath !== "login" &&
              currentPath !== "register" &&
              pages.map((page, i) => (
                <Button
                  key={i}
                  onClick={() => handlePageClick(page.name)}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    mx: 2,
                    textTransform: "none",
                    backgroundColor:
                      currentPath !== "login" && selectedPage === page.name
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
                  {page.name}
                </Button>
              ))}
          </Box>

          {!isAuth() && (
            <Stack direction="row" spacing={1}>
              <TextButton
                variant="text"
                onClick={() => handleNavigate("/login")}
              >
                Login
              </TextButton>
              <OutlinedButton
                variant="outlined"
                onClick={() => handleNavigate("/register")}
              >
                Sign Up Now
              </OutlinedButton>
            </Stack>
          )}
          {isAuth() && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <LanguagePopover />
              <NotificationsPopover />
              <AccountPopover />
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default PublicAppBar;
