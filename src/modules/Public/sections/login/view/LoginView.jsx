import React, { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

import { useRouter } from "../../../../../routes/hooks";

import { bgGradient } from "../../../../../theme/css";

import Iconify from "../../../../../components/iconify";
import FormField from "../../../../../components/FormField";
import { HandleCache, Validator } from "../../../../../utils/helpers";

import {
  auth,
  googleProvider,
  facebookProvider,
  twitterProvider,
} from "../../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import {
  options,
  ToastNotification,
  ToastNotificationContainer,
} from "../../../../../components/ToastNotificationComponents";
import { SignInWithExternal } from "../../../../../utils/SignInWithExternal";
import { login } from "../service";
import { CircularProgress } from "@mui/material";
// ----------------------------------------------------------------------

const validator = Validator({
  email: "required|email",
  password: "required",
});

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [formValues, setFormValues] = React.useState({
    values: {
      email: "",
      password: "",
    },
    errors: validator.errors,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [user] = useAuthState(auth);

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

  const handleValidate = () => {
    validator.validateAll(formValues.values).then((success) => {
      if (success) {
        handleSubmit();
      } else {
        setFormValues((prev) => ({
          ...prev,
          errors: validator.errors,
        }));
      }
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    login(formValues.values)
      .then((res) => {
        if (res.data.status === "success") {
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
        />

        <FormField
          name="password"
          label="Password"
          value={formValues.values.password}
          onChange={handleChange}
          errors={formValues.errors}
          type={showPassword ? "text" : "password"}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleValidate}
        disabled={loading}
      >
        {loading ? (
          <>
            <CircularProgress
              size={24}
              sx={{ color: "black", marginRight: 1 }}
            />
            Logging In...
          </>
        ) : (
          "Login"
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
              Sign in to {process.env.REACT_APP_NAME}
            </Typography>

            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              Don’t have an account?
              <Link variant="subtitle2" sx={{ ml: 0.5 }}>
                Get started
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
