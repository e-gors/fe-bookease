import { Grid } from "@mui/material";
import React from "react";
import FormField from "../../../../../../components/FormField";

function AsIndividual() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <FormField label="Fullname" />
      </Grid>
    </Grid>
  );
}

export default AsIndividual;
