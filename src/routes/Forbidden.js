import { Box, Typography } from "@mui/material";
import React from "react";

const styles = {
  root: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  font: {
    fontWeight: "bold",
    fontSize: {
      xs: 18,
      md: 36,
    },
  },
};

function Forbidden() {
  return (
    <Box sx={styles.root}>
      <Typography color="error" align="center" sx={styles.font}>
        Forbidden, You are not authorized to access this page!
      </Typography>
    </Box>
  );
}

export default Forbidden;
