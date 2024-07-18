import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  ContainedButton,
  OutlinedButton,
} from "../../../../../components/CustomButtons";
import CartoonDeveloper from "../../../../../assets/cartoon-developer.jpg";

export default function About() {
  return (
    <Box
      sx={{
        display: "grid",
        minHeight: "90vh",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        gap: 5, // Add gap between grid items
        my: { xs: 5, md: 10 },
      }}
      id="about"
    >
      <Box
        sx={{
          width: { xs: "100%", md: "85%" },
        }}
      >
        <img src={CartoonDeveloper} alt="Cartoon Developer" />
      </Box>
      <Box>
        <Typography
          variant="h4"
          sx={{
            letterSpacing: 2,
            my: 2,
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
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
          color="text.secondary"
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
