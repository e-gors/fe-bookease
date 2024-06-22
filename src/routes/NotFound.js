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
function NotFound() {
  return (
    <Box sx={styles.root}>
      <Typography sx={styles.font}>404 Page Not Found</Typography>
    </Box>
  );
}

export default NotFound;
