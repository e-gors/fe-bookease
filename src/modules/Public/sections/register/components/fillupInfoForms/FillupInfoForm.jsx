import { Grid } from "@mui/material";
import React from "react";
import FormField from "../../../../../../components/FormField";
import SelectDropdown from "../../../../../../components/SelectDropdown";
import PropTypes from "prop-types";

function FillupInfoForm(props) {
  const {
    inputFields = [],
    formValues,
    handleKeyPress,
    handleChange,
  } = props;

  return (
    <Grid container spacing={2}>
      {inputFields.map((input, i) => (
        <Grid item xs={12} sm={6} md={6} key={i}>
          {input.type === "text" ? (
            <FormField
              name={input.name}
              label={input.label}
              errors={formValues?.errors}
              value={formValues?.values[input.name]}
              onChange={(e) => handleChange(input.state, e)}
              handleKeyPress={handleKeyPress}
              size={input.size ? input.size : "small"}
            />
          ) : (
            <SelectDropdown
              name={input.name}
              label={input.label}
              options={input.options}
              errors={formValues?.errors}
              value={formValues?.values[input.name]}
              onChange={(e) => handleChange(input.state, e)}
              size={input.size ? input.size : "small"}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
}

FillupInfoForm.propTypes = {
  inputFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["text", "select"]).isRequired,
      options: PropTypes.arrayOf(PropTypes.string),
      size: PropTypes.string,
      state: PropTypes.string.isRequired,
    })
  ).isRequired,
  formValues: PropTypes.object.isRequired,
  handleKeyPress: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
};

export default FillupInfoForm;
