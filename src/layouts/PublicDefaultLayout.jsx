import { Box } from "@mui/material";
import React from "react";
import PublicAppBar from "./PublicAppBar";
import Footer from "./Footer";

function PublicDefaultLayout({ children }) {
  return (
    <Box>
      <PublicAppBar />
      <Box
        sx={{
          height: "auto",
          minHeight: "100vh",
          width: "90%",
          mx: "auto",
          my: 10,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default PublicDefaultLayout;
