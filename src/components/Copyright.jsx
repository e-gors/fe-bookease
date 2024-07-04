import { Link, Typography } from "@mui/material";

export default function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="inherit"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="http://localhost:3000/">
          BookEase
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }