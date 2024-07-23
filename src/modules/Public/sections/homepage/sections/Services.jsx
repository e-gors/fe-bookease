import React, { useEffect, useState } from "react";
import { Box, Chip, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Http from "../../../../../utils/Http";
import {
  setCategories,
  setSelectedCategories,
} from "../../../../../redux/actions/categoryActions";
import { compareArray, isEmpty } from "../../../../../utils/helpers";
import ServiceCard from "../components/ServiceCard";
import { ContainedButton } from "../../../../../components/CustomButtons";
import { useRouter } from "../../../../../routes/hooks";

function Services() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const categories = useSelector((state) => state.categories.categories);

  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [filters] = useState({ includeChildren: true });

  useEffect(() => {
    const controller = new AbortController();

    fetchData(filters);

    if (isEmpty(categories) && !isEmpty(services))
      dispatch(setCategories(services));
    else if (!isEmpty(services) && !compareArray(categories, services))
      dispatch(setCategories(services));

    return controller.abort();
  }, []);

  const fetchData = (params = {}) => {
    setLoading(true);
    Http.get("categories", { params })
      .then((res) => {
        if ((res.data.code = 200)) {
          setServices(res.data.data);
        } else {
          console.log(res.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const handleSelectService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };
  const handleRemoveCategory = (category) => {
    const updatedServices = selectedServices.filter(
      (s) => s.id !== category.id
    );
    setSelectedServices(updatedServices);
  };

  const handleBookNow = () => {
    if (!isEmpty(user)) router.push("/book-now");
    else router.push("/register");
    dispatch(setSelectedCategories(selectedServices));
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
        We offer tons of services to help you book more quickly, wherever you
        are.
      </Typography>
      <Stack
        direction="row"
        spacing={{ xs: 1, md: 1.5 }}
        useFlexGap
        flexWrap="wrap"
      >
        {selectedServices?.map((service, i) => (
          <Chip
            key={i}
            label={service.name}
            variant="outlined"
            onDelete={() => handleRemoveCategory(service)}
            color="success"
          />
        ))}
        {selectedServices.length !== 0 && (
          <ContainedButton
            variant="outlined"
            onClick={handleBookNow}
            sx={{ textWrap: "nowrap" }}
          >
            Book Now
          </ContainedButton>
        )}
      </Stack>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        {loading &&
          Array.from(new Array(12)).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton />
            </Grid>
          ))}
        {!loading &&
          Array.isArray(categories) &&
          services?.map((service, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <ServiceCard
                data={service}
                onSelectService={handleSelectService}
                selected={selectedServices?.some((s) => s.id === service.id)}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default React.memo(Services);
