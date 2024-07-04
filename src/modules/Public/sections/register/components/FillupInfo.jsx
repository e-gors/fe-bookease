import { Box, MenuItem, Typography } from "@mui/material";
import React from "react";
import AsCompany from "./service provider/AsCompany";
import Customer from "./customer/Customer";
import AsIndividual from "./service provider/AsIndividual";
import FormField from "../../../../../components/FormField";

const entity = ["Individual", "Company"];

function FillupInfo({ role, info, handleKeyPress, handleChange }) {
  const [selectedEntity, setSelectedEntity] = React.useState("");

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
      <Typography>Register as {role}</Typography>
      {role === "Service Provider" && (
        <Box sx={{ my: 2, maxWidth: 200 }}>
          <FormField
            select
            label="Select Your Entity"
            onChange={(e) => setSelectedEntity(e.target.value)}
            fullWidth
            value={selectedEntity}
          >
            {entity.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          </FormField>
        </Box>
      )}
      {role === "Customer" ? (
        <Customer info={info} handleKeyPress={handleKeyPress} handleChange={handleChange} />
      ) : selectedEntity === "Individual" ? (
        <AsIndividual info={info} handleKeyPress={handleKeyPress} handleChange={handleChange} />
      ) : (
        <AsCompany info={info} handleKeyPress={handleKeyPress} handleChange={handleChange} />
      )}
    </Box>
  );
}

export default FillupInfo;
