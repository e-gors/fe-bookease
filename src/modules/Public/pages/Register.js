import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Favicon from "../../../assets/images/favicon.png";
import { useHistory } from "react-router-dom";
import { isAuth } from "../../../utils/helpers";
import FormField from "../../../components/FormField";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const history = useHistory();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    values: {
      first_name: "",
      last_name: "",
      contact_number: "",
      email: "",
      password: "",
    },
  });
  const [checkStatus, setCheckStatus] = React.useState(false);

  if (isAuth()) {
    history.push("/client/1");
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

    // const { errors } = validator;

    // validator.validate(name, value).then(() => {
    //   setFormValues((prev) => ({
    //     ...prev,
    //     errors,
    //   }));
    // });
  };

  const handleCheckChange = () => {
    setCheckStatus(!checkStatus);
  };

  if (isAuth()) {
    history.push("/client/1");
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <img src={Favicon} alt="Favicon" /> */}
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  errors={formValues.errors}
                  onChange={handleChange}
                  value={formValues.values.first_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  errors={formValues.errors}
                  onChange={handleChange}
                  value={formValues.values.last_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  required
                  fullWidth
                  id="contact_number"
                  label="Contact Number"
                  name="contact_number"
                  autoComplete="contact-number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  errors={formValues.errors}
                  onChange={handleChange}
                  value={formValues.values.contact_number}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  // onKeyPress={handleKeyPress}
                  required
                  name="email"
                  errors={formValues.errors}
                  onChange={handleChange}
                  value={formValues.values.email}
                  size="small"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  InputProps={{
                    style: {
                      background: "rgba(255, 255, 255, 0.5)",
                      color: "black",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  required
                  // onKeyPress={handleKeyPress}
                  name="password"
                  errors={formValues.errors}
                  value={formValues.values.password}
                  onChange={handleChange}
                  size="small"
                  margin="normal"
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    style: {
                      background: "rgba(255, 255, 255, 0.5)",
                      coor: "black",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      onClick={handleCheckChange}
                    />
                  }
                  label="I agree to the Privacy Policy of the System."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
