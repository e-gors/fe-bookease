import { Button, styled } from "@mui/material";

const ContainedButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#5ABED5",
  color: "white",
  textTransform: "none",

  "&:hover": {
    backgroundColor: "#5ABED5",
    borderColor: "#5ABED5",
  },
}));

const OutlinedButton = styled(Button)(({ theme }) => ({
  borderColor: "#5ABED5",
  color: "#5ABED5",
  textTransform: "none",

  "&:hover": {
    backgroundColor: "#5ABED5",
    borderColor: "white",
    color: "white",
    boxShadow: 5
  },
}));

const TextButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: "black",
}));

export { ContainedButton, OutlinedButton, TextButton };
