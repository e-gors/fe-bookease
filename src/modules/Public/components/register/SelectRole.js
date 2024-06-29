import { Box, Stack, Typography } from "@mui/material";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import { isEmpty } from "../../../../utils/helpers";

const iconStyles = {
  width: 75,
  height: 75,
  color: "inherit",
};

const roles = [
  {
    role: "Customer",
    description: "I want to use BookEase to book appointments.",
    icon: <AccountCircleIcon sx={iconStyles} />,
  },
  {
    role: "Service Provider",
    description: "I want to use BookEase to provide services.",
    icon: <BuildCircleIcon sx={iconStyles} />,
  },
];

export default function SelectRole({ selectedRole, handleChangeRole }) {
  return (
    <Box sx={{ my: 5 }}>
      <Typography
        variant="subtitle1"
        gutterBottom
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Select Your Role
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {roles.map((role, i) => (
          <Stack
            key={i}
            direction="row"
            spacing={2}
            mt={2}
            sx={{
              border: `2px solid ${
                role.role === selectedRole ? "#FE9D8C" : "#5ABED5"
              }`,
              color: role.role === selectedRole ? "#FE9D8C" : "#5ABED5",
              p: 2,
              cursor: "pointer",
              borderRadius: 4,
              transition: "0.3s all",
            }}
            onClick={() => handleChangeRole(role.role)}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "inherit",
                }}
              >
                {role.role}
              </Typography>
              <Typography variant="subtitle1" mt={1} sx={{ color: "black" }}>
                {role.description}
              </Typography>
            </Box>
            {role.icon}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
