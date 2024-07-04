import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  ContainedButton,
  OutlinedButton,
} from "../../../../components/CustomButtons";
import ManWithCalendar from "../../../../assets/man-with-calendar.jpg";

export default function About() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        gap: 5, // Add gap between grid items
        my: 5
      }}
      id="about"
    >
      <Box>
        <img
          src={ManWithCalendar}
          alt="Man with a calendar"
          style={{
            width: "95%",
          }}
        />
      </Box>
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            letterSpacing: 2,
            fontSize: { xs: 18, sm: 24, md: 36 },
            mt: 2,
            mb: 2,
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            letterSpacing: 1,
            my: 2,
          }}
        >
          We are a dedicated team that wants to help people find their best
          choice for booking and appointment that our system might offer for
          them.
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            letterSpacing: 1,
            my: 2,
          }}
        >
          From medical appointments to pet services, we've got you covered. Our
          offerings include hair and beauty services, spa treatments, restaurant
          reservations, hotel accommodations, tutoring, event venues, travel
          services, photography, home services, and legal consultations. Our
          services may change, so stay tuned for new additions!
        </Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <ContainedButton variant="contained">Contact Us</ContainedButton>
          <OutlinedButton variant="outlined">Learn More!</OutlinedButton>
        </Stack>
      </Box>
    </Box>
  );
}
