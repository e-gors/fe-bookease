import {
  Avatar,
  Box,
  Chip,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import ManWithCalendar from "../../../../../assets/man-with-calendar.png";
import React from "react";
import BlogsCard from "../../../../../components/BlogsCard";

const services = [
  "All",
  "Service 1",
  "Service 2",
  "Service 3",
  "Service 4",
  "Service 5",
  "Service 6",
  "Service 7",
  "Service 8",
];

const data = [
  {
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    subTitle: "Service 1",
    title: "Mountain Adventure",
    description:
      "A breathtaking view of a hiker overlooking a vast mountain range. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    subTitle: "Service 2",
    title: "Cityscape at Night",
    description:
      "A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    subTitle: "Service 3",
    title: "Serene Beach",
    description:
      "A peaceful beach scene with gentle waves lapping against the shore under a clear sky. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    subTitle: "Service 4",
    title: "Autumn Leaves",
    description:
      "A close-up of vibrant autumn leaves in various shades of red, orange, and yellow. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    subTitle: "Service 1",
    title: "Mountain Adventure",
    description:
      "A breathtaking view of a hiker overlooking a vast mountain range. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    subTitle: "Service 2",
    title: "Cityscape at Night",
    description:
      "A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    subTitle: "Service 3",
    title: "Serene Beach",
    description:
      "A peaceful beach scene with gentle waves lapping against the shore under a clear sky. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    subTitle: "Service 4",
    title: "Autumn Leaves",
    description:
      "A close-up of vibrant autumn leaves in various shades of red, orange, and yellow. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    subTitle: "Service 1",
    title: "Mountain Adventure",
    description:
      "A breathtaking view of a hiker overlooking a vast mountain range. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    subTitle: "Service 2",
    title: "Cityscape at Night",
    description:
      "A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    subTitle: "Service 3",
    title: "Serene Beach",
    description:
      "A peaceful beach scene with gentle waves lapping against the shore under a clear sky. A stunning cityscape showcasing a bustling metropolis illuminated by night lights. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    subTitle: "Service 4",
    title: "Autumn Leaves",
    description:
      "A close-up of vibrant autumn leaves in various shades of red, orange, and yellow. A stunning cityscape showcasing a bustling metropolis illuminated by night lights.",
  },
];

export default function Blog() {
  const [selectedItem, setSelectedItem] = React.useState("All");

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <Box id="blog">
      <Box textAlign={{ xs: "left", md: "center" }}>
        <Typography
          variant="h4"
          sx={{
            letterSpacing: 2,
            my: 2,
          }}
        >
          Featured Professionals
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{
            letterSpacing: 1,
            my: 1,
          }}
        >
          Professionals share there experiences and testimonials as they use our
          system to meet their needs. Here are some of them.
        </Typography>
      </Box>
      <Box sx={{ overflow: "auto" }}>
        <Stack
          direction="row"
          spacing={2}
          my={2}
          justifyContent={{ xs: "left", md: "center" }}
        >
          {services.map((service, i) => {
            return (
              <Chip
                label={service}
                key={i}
                onClick={() => handleSelectItem(service)}
                sx={{
                  backgroundColor:
                    service === selectedItem ? "#5ABED5" : "transparent",
                  "&:hover": {
                    backgroundColor:
                      service === selectedItem ? "#5ABED5" : "#e0e0e0",
                  },
                  "&.MuiChip-clickable:active": {
                    backgroundColor:
                      service === selectedItem ? "#5ABED5" : "#e0e0e0",
                  },
                  color: service === selectedItem ? "#fff" : "#000",
                  transition: "ease-in-out 0.3s",
                }}
              />
            );
          })}
        </Stack>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          gap: 5, // Add gap between grid items
          my: { xs: 5, md: 3 },
        }}
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
          <Typography variant="subtitle1" sx={{ color: "#5ABED5" }}>
            Service 1
          </Typography>
          <Typography
            variant="h6"
            sx={{
              letterSpacing: 1,
              my: 2,
            }}
          >
            Wedding Event @ Marcela's Beach
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              letterSpacing: 1,
              my: 2,
            }}
          >
            First of all, I just want to say thank you to egoronweb's team for
            giving us this services where we book an appointment for our
            photographer during our wedding ceremony and it was a success. I
            highly recomend BookEase because they offer a lot of services that
            you can book online at your on time and space.
          </Typography>
          <Box sx={{ my: 2, display: "flex", alignItems: "center" }}>
            <Avatar alt="Efren Goron" sx={{ width: 55, height: 55 }} />
            <Stack ml={2}>
              <Typography variant="subtitle2">Efren Goron</Typography>
              <Typography variant="caption" color="text.secondary">
                March 18, 2024
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {data &&
          data.map((d, i) => {
            return (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <BlogsCard
                  url={d.imageUrl}
                  title={d.title}
                  description={d.description}
                />
              </Grid>
            );
          })}
      </Grid>
      <Box
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pagination
          count={100}
          variant="outlined"
          size="small"
          color="primary"
          siblingCount={1}
          sx={{
            "& .MuiPaginationItem-root": {
              mx: 0.5,
            },
          }}
        />
      </Box>
    </Box>
  );
}
