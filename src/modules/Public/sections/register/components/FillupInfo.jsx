import {
  Box,
  Button,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";
import FormField from "../../../../../components/FormField";
import FillupInfoForm from "./fillupInfoForms/FillupInfoForm";
import SelectDropdown from "../../../../../components/SelectDropdown";

const infoFields = [
  {
    type: "text",
    name: "name",
    label: "Fullname",
    size: "small",
    state: "account",
  },
  {
    type: "select",
    name: "address",
    label: "Street/Barangay",
    size: "small",
    state: "info",
    options: ["Lapulapu Atabay", "Bulgan Atabay"],
  },
  {
    type: "select",
    name: "city",
    label: "City/Municipality",
    size: "small",
    state: "info",
    options: ["Hilongos", "Hindang"],
  },
  {
    type: "select",
    name: "province",
    label: "Province",
    size: "small",
    state: "info",
    options: ["Leyte", "Cebu"],
  },
  {
    type: "select",
    name: "country",
    label: "Country",
    size: "small",
    state: "info",
    options: ["Philippines", "Japan"],
  },
  {
    type: "text",
    name: "postal_code",
    label: "ZIP/Postal Code",
    size: "small",
    state: "info",
  },
];

const addressFields = [
  {
    type: "text",
    name: "address",
    label: "Address",
    size: "small",
  },
];

const entity = ["Individual", "Businuess"];

function FillupInfo({ role, info, account, handleKeyPress, handleChange }) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    {
      label: `Select User Type`,
      body: (
        <SelectDropdown
          name="user_type"
          label="User Type"
          errors={account?.errors}
          options={entity}
          value={account.values.user_type}
          onChange={(e) => handleChange("account", e)}
          handleKeyPress={handleKeyPress}
        />
      ),
    },
    {
      label: `${account?.values?.user_type} Information`,
      body: (
        <FillupInfoForm
          inputFields={infoFields}
          handleKeyPress={handleKeyPress}
          handleChange={handleChange}
          formValues={info}
        />
      ),
    },
    {
      label: `${account?.values?.user_type} Address`,
      body: (
        <FillupInfoForm
          inputFields={addressFields}
          handleKeyPress={handleKeyPress}
          handleChange={handleChange}
          formValues={info}
        />
      ),
    },
    {
      label: "Create an ad",
      body: (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <FormField name="name" label="Fullname" />
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <Box sx={{ my: 5 }}>
      <Typography variant="subtitle1" gutterBottom>
        Provide Information that are Required (*)
      </Typography>
      <Typography>Register as {role}</Typography>
      <Box>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                {step.body}
                <Box sx={{ my: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Save" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}

export default FillupInfo;
