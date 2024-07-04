import { Box, Grid, MenuItem } from "@mui/material";
import VerticalStepper from "../../../../../../components/VerticalStepper";
import React from "react";
import FormField from "../../../../../../components/FormField";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say"];

function Customer({ handleKeyPress, info, handleChange }) {
  const steps = [
    {
      label: "Personal Information",
      body: (
        <Box component="form" sx={{ mt: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6}>
              <FormField
                onKeyPress={handleKeyPress}
                required
                name="first_name"
                errors={info.errors}
                onChange={(e) => handleChange('info', e)}
                value={info?.values.first_name}
                size="small"
                fullWidth
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormField
                onKeyPress={handleKeyPress}
                required
                name="last_name"
                errors={info.errors}
                onChange={(e) => handleChange('info', e)}
                value={info?.values.last_name}
                size="small"
                fullWidth
                label="Last Name"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormField
                onKeyPress={handleKeyPress}
                required
                name="gender"
                errors={info.errors}
                onChange={(e) => handleChange('info', e)}
                value={info?.values.gender}
                size="small"
                fullWidth
                label="Gender"
                select
              >
                {genders?.map((gender, i) => (
                  <MenuItem key={i} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </FormField>
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
              />
            </Grid>
          </Grid>
        </Box>
      ),
    },
    {
      label: "Personal Address",
      body: (
        <Box component="form" sx={{ mt: 1 }}>
          <Grid container spacing={1}>
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

export default Customer;
