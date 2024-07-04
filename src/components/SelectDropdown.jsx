import React from "react";
import { TextField } from "@mui/material";

function SelectDropdown(props) {
  const {
    errors,
    options = [],
    customError,
    noOptions = false,
    ...rest
  } = props;


  let error = false;
  let helperText = "";

  // handle customError
  if (customError) {
    error = customError.error || false;
    helperText = customError.message || "";
  }

  if (errors) {
    error = (errors && errors.has(props.name)) || false;
    helperText = (errors && errors.first(props.name)) || "";
  }

  const newProps = {
    variant: "outlined",
    select: true,
    margin: "dense",
    fullWidth: true,
    error,
    helperText,
    ...rest,
  };

  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      SelectProps={{ native: true }}
      {...newProps}
    >
      {!noOptions && <option value="">Select Option</option>}
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </TextField>
  );
}

export default SelectDropdown;
