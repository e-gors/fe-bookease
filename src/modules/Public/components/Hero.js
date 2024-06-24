import { Box, Stack, Typography } from "@mui/material";
import {
  ContainedButton,
  OutlinedButton,
} from "../../../components/CustomButtons";

export default function Hero() {
  return (
    <Box
      sx={{
        minHeight: "calc(80vh - 60px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Box sx={{ width: "45%" }}>
        <Typography
          variant="h3"
          gutterButtom
          sx={{ fontWeight: "bold", letterSpacing: 2 }}
        >
          Find and Book the Best Services Near You
        </Typography>
        <Typography variant="subtitle1" gutterButtom sx={{ letterSpacing: 1 }}>
          From medical appointments to pet services, we've got you covered. Our
          offerings include hair and beauty services, spa treatments, restaurant
          reservations, hotel accommodations, tutoring, event venues, travel
          services, photography, home services, and legal consultations. Our
          services may change, so stay tuned for new additions!
        </Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <ContainedButton variant="contained">Get Started</ContainedButton>
          <OutlinedButton variant="outlined">Sign Up Now</OutlinedButton>
        </Stack>
      </Box>
      <Box sx={{ width: "45%" }}>
        <Typography>This is the picture in Hero Section</Typography>
      </Box>
    </Box>
  );
}
