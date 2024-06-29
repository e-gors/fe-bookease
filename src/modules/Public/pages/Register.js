import * as React from "react";
import { CssBaseline, Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomStepper from "../components/register/CustomStepper";

const theme = createTheme();

export default function Register() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            my: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CustomStepper />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
