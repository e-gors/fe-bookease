import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { TextButton } from "../components/CustomButtons";
import { useHistory } from "react-router-dom";
import React from "react";
import Copyright from "../components/Copyright";
import { usePathname } from "../routes/hooks";

const infoLinks = [
  "About Us",
  "Contact Us",
  "Terms and Conditions",
  "Privacy Policy",
];
const pages = ["Home", "Services", "About Us", "Blog", "Contact Us"];

const icons = [
  {
    icon: <FacebookIcon />,
    name: "Facebook",
    link: "https://www.facebook.com/",
  },
  {
    icon: <InstagramIcon />,
    name: "Instagram",
    link: "https://www.instagram.com/",
  },
  {
    icon: <LinkedInIcon />,
    name: "LinkedIn",
    link: "https://www.linkedin.com/",
  },
  {
    icon: <TwitterIcon />,
    name: "Twitter",
    link: "https://www.twitter.com/",
  },
  {
    icon: <YouTubeIcon />,
    name: "YouTube",
    link: "https://www.youtube.com/",
  },
  {
    icon: <PinterestIcon />,
    name: "Pinterest",
    link: "https://www.pinterest.com/",
  },
];

export default function Footer() {
  const history = useHistory();
  const pathname = usePathname();

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      const offset = -60;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // Smooth scrolling behavior
      });
    }
  };

  const handlePageClick = (page) => {
    const isIncluded = pages.includes(page);
    const link = page.split(" ");

    if (isIncluded) {
      scrollToSection(link[0]?.toLowerCase());
    } else {
      handleNavigate(`/${link[0]?.toLowerCase()}`);
    }
  };

  const handleNavigate = (link) => {
    history.push(link);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1e272c",
        color: "white",
        py: 5,
        px: { xs: 2, sm: 5, md: 10 },
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Stack direction="row" spacing={2} my={1}>
                <AlternateEmailIcon />
                <Typography>egoronweb@gmail.com</Typography>
              </Stack>
              <Stack direction="row" spacing={2} my={1}>
                <PhoneIcon />
                <Typography>Support (+63) 905 417 0203</Typography>
              </Stack>
              <Stack direction="row" spacing={1} mt={5}>
                {icons.map((icon, index) => (
                  <IconButton
                    key={index}
                    aria-label={icon.name}
                    sx={{ color: "inherit" }}
                    onClick={() => handleNavigate(icon.link)}
                  >
                    {icon.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Box>
        </Grid>
        {pathname !== "/login" && pathname !== "/register" && (
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
                mt: { xs: 5, md: 0 },
              }}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
              >
                <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                  Information
                </Typography>
                {infoLinks.map((link, i) => (
                  <TextButton
                    key={i}
                    sx={{ color: "inherit" }}
                    onClick={() => handlePageClick(link)}
                  >
                    {link}
                  </TextButton>
                ))}
              </Stack>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
              >
                <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                  Quick Links
                </Typography>
                {pages.map((page, i) => (
                  <TextButton
                    key={i}
                    sx={{ color: "inherit" }}
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </TextButton>
                ))}
              </Stack>
            </Box>
          </Grid>
        )}
      </Grid>
      <Divider sx={{ color: "white", my: 2 }} />
      <Copyright />
    </Box>
  );
}
