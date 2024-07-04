import * as React from "react";
import { CssBaseline, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomStepper from "../components/CustomStepper";

const theme = createTheme();

export default function RegisterView() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CustomStepper />
      </Box>
    </ThemeProvider>
  );
}
