import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import FormField from "../../../../../components/FormField";
import React from "react";
import { ContainedButton } from "../../../../../components/CustomButtons";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  ToastNotificationContainer,
  ToastNotification,
  options,
} from "../../../../../components/ToastNotificationComponents";
import { Validator } from "../../../../../utils/helpers";

const validator = Validator({
  first_name: "required",
  last_name: "required",
  email: "required|email",
  company: "",
  phone: "required|regex:[/^09{9}$/]|length:11",
  message: "required",
});

const theme = createTheme();

export default function Contact() {
  const [loading, setLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    values: {
      first_name: "",
      last_name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    },
    errors: validator.errors,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));

    const { errors } = validator;

    validator.validate(name, value).then(() => {
      setFormValues((prev) => ({
        ...prev,
        errors,
      }));
    });
  };

  const handleSubmit = () => {
    const { first_name, last_name, email, company, phone, message } =
      formValues.values;

    console.log({
      firstName: first_name,
      lastName: last_name,
      email: email,
      company: company,
      phone: phone,
      message: message,
    });
  };

  const handleValidate = () => {
    validator.validateAll(formValues.values).then((success) => {
      if (success) {
        handleSubmit();
      } else {
        const errors = validator.errors.items;
        errors.forEach((error) => {
          ToastNotification("error", error.msg, options);
        });
        setFormValues((prev) => ({
          ...prev,
          errors: validator.errors,
        }));
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleValidate();
    }
  };

  return (
    <>
      <ToastNotificationContainer />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          gap: 5,
          mt: 5,
        }}
        id="contact"
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              letterSpacing: 2,
              my: 2,
            }}
          >
            Contact Us
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Not sure what you need? The team at BookEase will be happy to listen
            to you and suggest event ideas you hadn't considered.
          </Typography>
          <Box
            sx={{
              mt: 1,
              "& > *": {
                my: 2,
              },
            }}
          >
            <Stack direction="row" spacing={2}>
              <AlternateEmailIcon />
              <Typography>egoronweb@gmail.com</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <PhoneIcon />
              <Typography>Support (+63) 905 417 0203</Typography>
            </Stack>
          </Box>
        </Box>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="sm">
            <Box>
              <Typography component="h1" variant="h5">
                Let's Get In Touch.
              </Typography>
              <Typography>
                Or just reach out manually to
                <span style={{ color: "blue" }}> egoronweb@gmail.com</span>
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={{ xs: 1, md: 2 }}>
                  <Grid item xs={6} sm={6}>
                    <FormField
                      onKeyPress={handleKeyPress}
                      name="first_name"
                      label="First Name"
                      value={formValues.values.first_name}
                      onChange={handleChange}
                      errors={formValues.errors}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FormField
                      onKeyPress={handleKeyPress}
                      name="last_name"
                      label="Last Name"
                      value={formValues.values.last_name}
                      onChange={handleChange}
                      errors={formValues.errors}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      onKeyPress={handleKeyPress}
                      name="email"
                      label="Email Address"
                      value={formValues.values.email}
                      onChange={handleChange}
                      errors={formValues.errors}
                      type="email"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      onKeyPress={handleKeyPress}
                      name="phone"
                      label="Phone Number"
                      value={formValues.values.phone}
                      onChange={handleChange}
                      errors={formValues.errors}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormField
                      onKeyPress={handleKeyPress}
                      name="company"
                      label="Company Name"
                      value={formValues.values.company}
                      onChange={handleChange}
                      errors={formValues.errors}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormField
                      onKeyPress={handleKeyPress}
                      multiline
                      rows={4}
                      name="message"
                      label="Your Message"
                      value={formValues.values.message}
                      onChange={handleChange}
                      errors={formValues.errors}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <ContainedButton
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleValidate}
                >
                  Send
                </ContainedButton>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </>
  );
}
