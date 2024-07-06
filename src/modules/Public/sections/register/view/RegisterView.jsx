import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { alpha, useTheme } from "@mui/material/styles";

import { useRouter } from "../../../../../routes/hooks";

import { bgGradient } from "../../../../../theme/css";

import Iconify from "../../../../../components/iconify";
import FormField from "../../../../../components/FormField";
import {
  HandleCache,
  isMatchPassword,
  Validator,
} from "../../../../../utils/helpers";

import {
  auth,
  googleProvider,
  facebookProvider,
  twitterProvider,
} from "../../../../../utils/firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import {
  options,
  ToastNotification,
  ToastNotificationContainer,
} from "../../../../../components/ToastNotificationComponents";
import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { login, register } from "../../service";
// ----------------------------------------------------------------------

const validator = Validator({
  email: "required|email",
  password: "required|min:6|max:20",
  retype_password: "required",
});

export default function RegisterView() {
  const theme = useTheme();

  const router = useRouter();

  const [formValues, setFormValues] = React.useState({
    values: {
      email: "",
      password: "",
      retype_password: "",
    },
    errors: validator.errors,
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    retype_password: false,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const [user] = useAuthState(auth);

  //user uses the external login functionalities to login
  const SignInWithExternal = (auth, provider, AuthProvider) => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = AuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        const addInfo = getAdditionalUserInfo(result);
        // ...
        // adds data to local storage
        const isNewUser = addInfo.isNewUser;
        const profile = addInfo.profile;

        if (isNewUser) {
          handleSubmit(profile);
        } else {
          Login(profile);
        }
        // HandleCache([
        //   { name: "accessToken", data: token, method: "set" },
        //   { name: "user", data: user, method: "set" },
        // ]);
        // router.push("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        //   const email = error.customData.email;
        // The AuthCredential type that was used.
        //   const credential = AuthProvider.credentialFromError(error);
        // ...
        if (errorCode !== "auth/popup-closed-by-user") {
          ToastNotification("error", errorMessage, options);
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      values: { ...prev.values, [name]: value },
    }));

    const { errors } = validator;

    validator.validate(name, value).then(() => {
      setFormValues((prev) => ({
        ...prev,
        errors,
      }));
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleValidate();
    }
  };

  //uses for checking if password matched during the process of inputing data
  const handleKeyUp = (e) => {
    const { name } = e.target;
    const { password, retype_password } = formValues.values;

    if (name === "retype_password" || name === "password") {
      if (!isMatchPassword(password, retype_password)) {
        setError("Password does not match!");
      } else {
        setError("");
      }
    }
  };

  const handleShowPassword = (name) => {
    if (name === "password") {
      setShowPassword({ ...showPassword, password: !showPassword.password });
    } else {
      setShowPassword({
        ...showPassword,
        retype_password: !showPassword.retype_password,
      });
    }
  };

  const handleValidate = () => {
    validator.validateAll(formValues.values).then((success) => {
      if (success) {
        handleSubmit(formValues.values);
      } else {
        setFormValues((prev) => ({
          ...prev,
          errors: validator.errors,
        }));
      }
    });
  };

  //if user uses external means to register and is already registered 
  const Login = (data) => {
    login(data)
      .then((res) => {
        if (res.data.status === 201) {
          HandleCache({ name: "accessToken", data: res.data.token }, "set");
          HandleCache({ name: "user", data: res.data.user }, "set");
          router.push("/dashboard");
        } else {
          ToastNotification("error", res.data.message, options);
        }
        setLoading(false);
      })
      .catch((err) => {
        ToastNotification("error", err.message, options);
        setLoading(false);
      });
  };

  //if user uses the external means to register and also for manual register
  const handleSubmit = (data) => {
    if (!error) {
      setLoading(true);
      register(data)
        .then((res) => {
          if (res.data.status === 201) {
            HandleCache({ name: "accessToken", data: res.data.token }, "set");
            HandleCache({ name: "user", data: res.data.user }, "set");
            router.push("/dashboard");
          } else {
            ToastNotification("error", res.data.message, options);
          }
          setLoading(false);
        })
        .catch((err) => {
          ToastNotification("error", err.message, options);
          setLoading(false);
        });
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <FormField
          name="email"
          label="Email address"
          value={formValues.values.email}
          onChange={handleChange}
          errors={formValues.errors}
          type="email"
          required
          onKeyPress={handleKeyPress}
          onKeyUp={handleKeyUp}
        />
        <FormField
          name="password"
          label="Password"
          value={formValues.values.password}
          onChange={handleChange}
          errors={formValues.errors}
          type={showPassword.password ? "text" : "password"}
          required
          onKeyPress={handleKeyPress}
          onKeyUp={handleKeyUp}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleShowPassword("password")}
                  edge="end"
                >
                  <Iconify
                    icon={
                      showPassword.password
                        ? "eva:eye-fill"
                        : "eva:eye-off-fill"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormField
          name="retype_password"
          label="Retype Password"
          value={formValues.values.retype_password}
          onChange={handleChange}
          errors={formValues.errors}
          type={showPassword.retype_password ? "text" : "password"}
          required
          onKeyPress={handleKeyPress}
          onKeyUp={handleKeyUp}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleShowPassword("retype_password")}
                  edge="end"
                >
                  <Iconify
                    icon={
                      showPassword.retype_password
                        ? "eva:eye-fill"
                        : "eva:eye-off-fill"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && (
          <FormHelperText
            error
            component="span"
            sx={{ position: "relative", top: -20, left: 15 }}
          >
            {error}
          </FormHelperText>
        )}
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 2 }}
      >
        <Box>
          <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
            <FormLabel component="legend" sx={{ fontSize: 12 }}>
              Please read the Terms and Privacy Policy
            </FormLabel>
            <FormControlLabel
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: 11,
                },
              }}
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
              }
              label="I agree to the Terms and Conditions"
            />
            <FormHelperText>
              By signing up for {process.env.REACT_APP_NAME}, you agree to our{" "}
              <span
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Terms and Conditions
              </span>
            </FormHelperText>
          </FormControl>
        </Box>
      </Stack>

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleValidate}
        disabled={loading || !isChecked}
      >
        {loading ? (
          <>
            <CircularProgress
              size={24}
              sx={{ color: "black", marginRight: 1 }}
            />
            Processing...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </>
  );

  return (
    <>
      <ToastNotificationContainer />
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: "/assets/background/overlay_4.jpg",
          }),
          height: 1,
        }}
      >
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 450,
              boxShadow: 5,
            }}
          >
            <Typography variant="h4">
              Sign Up to {process.env.REACT_APP_NAME}
            </Typography>

            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              Already have an account?
              <Link
                variant="subtitle2"
                sx={{ ml: 0.5, cursor: "pointer" }}
                href="/login"
              >
                Login here
              </Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                onClick={() =>
                  SignInWithExternal(auth, googleProvider, GoogleAuthProvider)
                }
              >
                <Iconify icon="eva:google-fill" color="#DF3E30" />
              </Button>

              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                onClick={() =>
                  SignInWithExternal(
                    auth,
                    facebookProvider,
                    FacebookAuthProvider
                  )
                }
              >
                <Iconify icon="eva:facebook-fill" color="#1877F2" />
              </Button>

              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                onClick={() =>
                  SignInWithExternal(auth, twitterProvider, TwitterAuthProvider)
                }
              >
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>

            {renderForm}
          </Card>
        </Stack>
      </Box>
    </>
  );
}
