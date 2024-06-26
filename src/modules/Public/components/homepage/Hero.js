import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  ContainedButton,
  OutlinedButton,
} from "../../../../components/CustomButtons";
import ManWithCalendar from "../../../../assets/man-with-calendar.jpg";
import { useHistory } from "react-router-dom";

export default function Hero() {
  const history = useHistory();

  const handleNavigate = (link) => {
    history.push(link);
  };

  return (
    <Box
      sx={{
        height: "auto",
        minHeight: "calc(100vh - 60px)",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        gap: 5, // Add gap between grid items
        margin: "auto",
      }}
      id="home"
    >
      <Box>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bold",
            letterSpacing: 2,
            fontSize: { xs: 24, sm: 36, md: 50 },
            my: 2,
          }}
        >
          Find and Book the Best Services Near You
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ letterSpacing: { xs: 0, md: 1 } }}
        >
          From medical appointments to pet services, we've got you covered. Our
          offerings include hair and beauty services, spa treatments, restaurant
          reservations, hotel accommodations, tutoring, event venues, travel
          services, photography, home services, and legal consultations. Our
          services may change, so stay tuned for new additions!
        </Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <ContainedButton variant="contained">Get Started</ContainedButton>
          <OutlinedButton
            variant="outlined"
            onClick={() => handleNavigate("/register")}
          >
            Sign Up Now
          </OutlinedButton>
        </Stack>
      </Box>
      <Box>
        <img
          src={ManWithCalendar}
          alt="Man with a calendar"
          style={{
            width: "95%",
          }}
        />
      </Box>
    </Box>
  );
}
