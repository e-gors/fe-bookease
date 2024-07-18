import { Box, Grid, Skeleton, Typography } from "@mui/material";
import ServiceCard from "../components/ServiceCard";
import React from "react";
import Http from "../../../../../utils/Http";

export default function Services() {
  const [loading, setLoading] = React.useState(false);
  const [services, setServices] = React.useState([]);
  const [filters, setFilters] = React.useState({
    includeChildren: true,
  });

  React.useEffect(() => {
    const controller = new AbortController();

    fetchData(filters);
    return () => controller.abort();
  }, []);

  const fetchData = (params = {}) => {
    setLoading(true);
    Http.get("/categories", {
      params: {
        ...params,
      },
    })
      .then((res) => {
        setServices(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  return (
    <Box sx={{ flexGrow: 1, my: 5 }} id="services">
      <Typography
        variant="h4"
        sx={{
          letterSpacing: 2,
          my: 2,
          textAlign: { xs: "left", md: "center" },
        }}
      >
        Services We Offer
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{
          letterSpacing: 1,
          my: 2,
          textAlign: { xs: "left", md: "center" },
        }}
      >
        We offer tons of Services to help you book more faster and wherever you
        are.
      </Typography>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        {!loading
          ? services?.map((service, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <ServiceCard data={service} />
              </Grid>
            ))
          : Array.from(new Array(12)).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}
