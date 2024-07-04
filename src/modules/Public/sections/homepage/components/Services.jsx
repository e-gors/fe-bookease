import { Box, Grid, Typography } from "@mui/material";
import ServicesCard from "../../../../../components/ServicesCard";

const data = [
  {
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    title: "Mountain Adventure",
    description:
      "A breathtaking view of a hiker overlooking a vast mountain range. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    title: "Cityscape at Night",
    description:
      "A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    title: "Serene Beach",
    description:
      "A peaceful beach scene with gentle waves lapping against the shore under a clear sky. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    title: "Autumn Leaves",
    description:
      "A close-up of vibrant autumn leaves in various shades of red, orange, and yellow. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    title: "Mountain Adventure",
    description:
      "A breathtaking view of a hiker overlooking a vast mountain range. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    title: "Cityscape at Night",
    description:
      "A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    title: "Serene Beach",
    description:
      "A peaceful beach scene with gentle waves lapping against the shore under a clear sky. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    title: "Autumn Leaves",
    description:
      "A close-up of vibrant autumn leaves in various shades of red, orange, and yellow. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    title: "Mountain Adventure",
    description:
      "A breathtaking view of a hiker overlooking a vast mountain range. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    title: "Cityscape at Night",
    description:
      "A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    title: "Serene Beach",
    description:
      "A peaceful beach scene with gentle waves lapping against the shore under a clear sky. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    title: "Autumn Leaves",
    description:
      "A close-up of vibrant autumn leaves in various shades of red, orange, and yellow. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
];

export default function Services() {
  return (
    <Box sx={{ flexGrow: 1, my: 5 }} id="services">
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          letterSpacing: 2,
          fontSize: { xs: 18, sm: 24, md: 36 },
          my: 2,
          textAlign: { xs: "left", md: "center" },
        }}
      >
        Services We Offer
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          letterSpacing: 1,
          my: 2,
          textAlign: { xs: "left", md: "center" },
        }}
      >
        We offer tons of Services to help you book more faster and wherever you
        are.
      </Typography>
      <Grid container spacing={2}>
        {data &&
          data.map((d, i) => {
            return (
              <Grid key={i} item xs={12} sm={6} md={3}>
                <ServicesCard
                  url={d.imageUrl}
                  title={d.title}
                  description={d.description}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
