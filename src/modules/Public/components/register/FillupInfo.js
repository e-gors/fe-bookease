import { Box, Typography } from "@mui/material";
import React from "react";
import FormField from "../../../../components/FormField";

export default function FillupInfo({ info, handleKeyPress, handleChange }) {
  return (
    <Box sx={{ my: 5 }}>
      <Typography
        variant="subtitle1"
        gutterBottom
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Provide Information that are Required
      </Typography>
      <Box component="form" sx={{ mt: 1 }}>
        <FormField
          onKeyPress={handleKeyPress}
          required
          name="firstname"
          errors={info.errors}
          onChange={(e) => handleChange("info", e)}
          value={info.values?.firstname}
          size="small"
          margin="normal"
          fullWidth
          label="First Name"
        />
        <FormField
          onKeyPress={handleKeyPress}
          required
          name="lastname"
          errors={info.errors}
          onChange={(e) => handleChange("info", e)}
          value={info.values?.lastname}
          size="small"
          margin="normal"
          fullWidth
          label="Last Name"
        />
      </Box>
    </Box>
  );
}
