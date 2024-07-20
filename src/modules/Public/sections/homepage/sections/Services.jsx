import { Box, Grid, Skeleton, Typography } from "@mui/material";
import ServiceCard from "../components/ServiceCard";
import React from "react";
import Http from "../../../../../utils/Http";
import { useDispatch } from "react-redux";
import { setCategories } from "../../../../../redux/actions/categoryActions";

function Services() {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [services, setServices] = React.useState([]);
  const [selectedService, setSelectedService] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [filters, setFilters] = React.useState({
    includeChildren: true,
  });

  React.useEffect(() => {
    const controller = new AbortController();

    fetchData(filters);
    return () => controller.abort();
  }, [filters]); //eslint-disable-line

  const fetchData = (params = {}) => {
    setLoading(true);
    Http.get("/categories", {
      params: {
        ...params,
      },
    })
      .then((res) => {
        dispatch(setCategories(res.data.data));
        setServices(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const handleSelectService = (service) => {
    if (service.id === selectedService.id) {
      setSelectedService({});
    } else {
      setSelectedService(service);
      setOpen(true);
    }
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
                <ServiceCard
                  data={service}
                  selectedService={selectedService}
                  onSelectService={handleSelectService}
                  selected={selectedService.id === service.id}
                  open={open}
                  onClose={setOpen}
                />
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

export default React.memo(Services);
