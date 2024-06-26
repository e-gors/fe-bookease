import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { TextButton } from "../components/CustomButtons";

export default function Footer() {
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
        <Grid item sx={12} md={4}>
          <Box>
            <Stack direction="row" spacing={2} my={1}>
              <AlternateEmailIcon />
              <Typography>egoronweb@gmail.com</Typography>
            </Stack>
            <Stack direction="row" spacing={2} my={1}>
              <PhoneIcon />
              <Typography>Support (+63) 905 417 0203</Typography>
            </Stack>
            <Stack direction="row" spacing={2} mt={5}>
              <FacebookIcon />
              <InstagramIcon />
              <LinkedInIcon />
              <TwitterIcon />
              <YouTubeIcon />
              <PinterestIcon />
            </Stack>
          </Box>
        </Grid>
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
              <TextButton sx={{ color: "white" }}>About Us</TextButton>
              <TextButton sx={{ color: "white" }}>Contact Us</TextButton>
              <TextButton sx={{ color: "white" }}>
                Terms and Conditions
              </TextButton>
              <TextButton sx={{ color: "white" }}>Privacy Policy</TextButton>
            </Stack>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                Quick Links
              </Typography>
              <TextButton sx={{ color: "white" }}>Home</TextButton>
              <TextButton sx={{ color: "white" }}>Services</TextButton>
              <TextButton sx={{ color: "white" }}>About</TextButton>
              <TextButton sx={{ color: "white" }}>Blog</TextButton>
              <TextButton sx={{ color: "white" }}>Contact</TextButton>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ color: "white", my: 2 }} />
      <Typography textAlign="center">All rights Reserved @ 2024</Typography>
    </Box>
  );
}
