import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

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
import { login, register } from "../../service";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../../redux/actions/userActions";
import { setAccount } from "../../../../../redux/actions/registerActions";
// ----------------------------------------------------------------------

const validator = Validator({
  email: "required|email",
  password: "required",
});

export default function LoginView() {
  const dispatch = useDispatch();
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

  //user uses the external login functionalities to login
  const SignInWithExternal = (auth, provider, AuthProvider) => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = AuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        const addInfo = getAdditionalUserInfo(result);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        // adds data to local storage
        const isNewUser = addInfo.isNewUser;
        const profile = addInfo.profile;

        if (isNewUser) {
          Register(profile);
        } else {
          handleSubmit(profile);
        }
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
        setLoading(false);
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

  // using 3rd party and not yet register save to redux storage
  const Register = (data) => {
    console.log(data);
    // dispatch(setAccount(data));
    // router.push("/complete-registration");
  };

  //if user user external means to login or by manual login
  const handleSubmit = (data) => {
    setLoading(true);
    login(data)
      .then((res) => {
        if (res.data.status === 200) {
          const { token, user } = res.data;
          HandleCache({ name: "accessToken", data: token }, "set");
          dispatch(setUser(res.data.user));
          if (user?.isVerified === true) {
            router.push("/dashboard");
          } else {
            router.push("/verify-email");
          }
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
          onKeyPress={handleKeyPress}
        />

        <FormField
          name="password"
          label="Password"
          value={formValues.values.password}
          onChange={handleChange}
          errors={formValues.errors}
          type={showPassword ? "text" : "password"}
          required
          onKeyPress={handleKeyPress}
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
        <Link
          variant="subtitle2"
          underline="hover"
          sx={{ cursor: "pointer" }}
          href="/forgot-password"
        >
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
              <Link
                variant="subtitle2"
                sx={{ ml: 0.5, cursor: "pointer" }}
                href="/register"
              >
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
