import { Box, Grid } from "@mui/material";
import VerticalStepper from "../../../../../components/VerticalStepper";
import React from "react";
import FormField from "../../../../../components/FormField";

function AsCompany({ handleKeyPress, info, handleChange }) {
  const steps = [
    {
      label: "Personal Information",
      body: (
        <Box component="form" sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <FormField
                onKeyPress={handleKeyPress}
                required
                name="company"
                errors={info.errors}
                onChange={(e) => handleChange('info', e)}
                value={info?.values.company}
                size="small"
                fullWidth
                label="Company Name"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormField
                onKeyPress={handleKeyPress}
                required
                name="contact_person"
                errors={info.errors}
                onChange={(e) => handleChange('info', e)}
                value={info?.values.contact_person}
                size="small"
                fullWidth
                label="Contact Person"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormField
                onKeyPress={handleKeyPress}
                required
                name="phone_number"
                errors={info.errors}
                onChange={(e) => handleChange('info', e)}
                value={info?.values.phone_number}
                size="small"
                fullWidth
                label="Phone Number"
              ></FormField>
            </Grid>
          </Grid>
        </Box>
      ),
    },
    {
      label: "Personal Address",
      body: (
        <Box component="form" sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <FormField
                onKeyPress={handleKeyPress}
                required
                name="street"
                errors={info.errors}
                onChange={(e) => handleChange('info', e)}
                value={info?.values.street}
                size="small"
                fullWidth
                label="Street"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormField
                onKeyPress={handleKeyPress}
                required
                name="barangay"
                errors={info.errors}
                onChange={(e) => handleChange('info', e)}
                value={info?.values.barangay}
                size="small"
                fullWidth
                label="Barangay"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormField
                onKeyPress={handleKeyPress}
                required
                name="locality"
                errors={info.errors}
                onChange={(e) => handleChange('info', e)}
                value={info?.values.locality}
                size="small"
                fullWidth
                label="City/Municipality"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormField
                onKeyPress={handleKeyPress}
                required
                name="province"
                errors={info.errors}
                onChange={(e) => handleChange('info', e)}
                value={info?.values.province}
                size="small"
                fullWidth
                label="Province"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormField
                onKeyPress={handleKeyPress}
                required
                name="country"
                errors={info.errors}
                onChange={(e) => handleChange('info', e)}
                value={info?.values.country}
                size="small"
                fullWidth
                label="Country"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormField
                onKeyPress={handleKeyPress}
                required
                name="postal_code"
                errors={info.errors}
                onChange={(e) => handleChange('info', e)}
                value={info?.values.postal_code}
                size="small"
                fullWidth
                label="ZIP/Postal Code"
              />
            </Grid>
          </Grid>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <VerticalStepper steps={steps} />
    </Box>
  );
}

export default AsCompany;
