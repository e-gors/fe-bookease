import { Box, Typography } from "@mui/material";
import React from "react";
import FormField from "../../../../../components/FormField";

function CreateAccount({
  account,
  handleKeyPress,
  handleChange,
}) {
  return (
    <Box sx={{ my: 5 }}>
      <Typography
        variant="subtitle1"
        gutterBottom
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Provide Information that are Required (*)
      </Typography>
      <Box component="form" sx={{ mt: 1 }}>
        <FormField
          onKeyPress={handleKeyPress}
          required
          name="email"
          errors={account?.errors}
          onChange={(e) => handleChange("account", e)}
          value={account?.values?.email}
          size="small"
          margin="normal"
          fullWidth
          label="Email Address"
          type="email"
        />
        <FormField
          onKeyPress={handleKeyPress}
          required
          name="password"
          errors={account?.errors}
          onChange={(e) => handleChange("account", e)}
          value={account?.values?.password}
          size="small"
          margin="normal"
          fullWidth
          label="Password"
          type="password"
        />
        <FormField
          onKeyPress={handleKeyPress}
          required
          name="re_password"
          errors={account?.errors}
          onChange={(e) => handleChange("account", e)}
          value={account?.values?.re_password}
          size="small"
          margin="normal"
          fullWidth
          label="Retype Password"
          type="password"
        />
      </Box>
    </Box>
  );
}

export default CreateAccount;