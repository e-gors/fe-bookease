import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Box, Stack } from "@mui/material";
import SelectRole from "./SelectRole";
import FillupInfo from "./FillupInfo";
import CreateAccount from "./CreateAccount";
import { TextButton } from "../../../../../components/CustomButtons";
import { HandleCache, Validator, isEmpty } from "../../../../../utils/helpers";
import {
  ToastNotification,
  ToastNotificationContainer,
  options,
} from "../../../../../components/ToastNotificationComponents";

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PersonIcon />,
    2: <InfoIcon />,
    3: <AccountCircleIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const infoValidator = Validator({
  phone_number: "required|regex:[^09{9}$]|length:11",
  address: "required",
  city: "required",
  province: "required",
  country: "required",
  postal_code: "required",
});

const accountValidator = Validator({
  name: "required",
  user_type: "required",
});

const steps = ["Select Role", "Provide Information", "Create User Account"];

function CustomStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedRole, setSelectedRole] = React.useState("");
  const [accountValues, setAccountValues] = React.useState({
    values: {
      name: "",
      user_type: "",
    },
    errors: accountValidator.errors,
  });
  const [infoValues, setInfoValues] = React.useState({
    values: {
      phone_number: "",
      address: "",
      city: "",
      province: "",
      country: "",
      postal_code: "",
    },
    errors: infoValidator.errors,
  });

  React.useEffect(() => {
    fetchDataFromCache();
  }, []);

  const fetchDataFromCache = () => {
    const role = HandleCache({ name: "role" }, "get");
    const information = HandleCache({ name: "info" }, "get");
    const accountValues = HandleCache({ name: "account" }, "get");

    if (role) {
      setSelectedRole(role);
    }
    if (information) {
      setInfoValues((prevInfo) => ({
        ...prevInfo,
        values: { ...information },
      }));
    }
    if (accountValues) {
      setAccountValues((prevAccount) => ({
        ...prevAccount,
        values: { ...accountValues },
      }));
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeRole = (role) => {
    setSelectedRole(role);
  };

  const handleChange = (state, e) => {

    const name = e.target.name;
    const value = e.target.value;

    console.log({name, value});

    if (state === "info") {
      setInfoValues((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [name]: value,
        },
      }));

      const { errors } = infoValidator;

      infoValidator.validate(name, value).then(() => {
        setInfoValues((prev) => ({
          ...prev,
          errors,
        }));
      });
    } else {
      setAccountValues((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [name]: value,
        },
      }));

      const { errors } = accountValidator;

      accountValidator.validate(name, value).then(() => {
        setAccountValues((prev) => ({
          ...prev,
          errors,
        }));
      });
    }
  };

  const handleValidate = () => {
    if (activeStep === 0) {
      if (isEmpty(selectedRole)) {
        ToastNotification("error", "You need to select your role!", options);
      } else {
        HandleCache({ name: "role", data: selectedRole }, "set");
        handleNext();
      }
    } else if (activeStep === 1) {
      infoValidator.validateAll(infoValues.values).then((success) => {
        if (success) {
          HandleCache({ name: "infoValues", data: infoValues.values }, "set");
          handleNext();
        } else {
          setInfoValues((prev) => ({
            ...prev,
            errors: infoValidator.errors,
          }));
        }
      });
    } else if (activeStep === 2) {
      accountValidator.validateAll(accountValues.values).then((success) => {
        if (success) {
          HandleCache(
            { name: "accountValues", data: accountValues.values },
            "set"
          );
          handleSubmit();
        } else {
          setAccountValues((prev) => ({
            ...prev,
            errors: accountValidator.errors,
          }));
        }
      });
    } else {
      console.log("Only three steps");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // HandleValidateInfo();
    }
  };

  const handleSubmit = () => {
    const data = {
      selectedRole: selectedRole,
      infoValues: infoValues.values,
      accountValues: accountValues.values,
    };

    console.group(data);
  };

  return (
    <Box
      sx={{ width: "100%", my: 10, mx: "auto", height: "auto" }}
      maxWidth="sm"
    >
      <ToastNotificationContainer />
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, i) => (
          <Step key={i}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <SelectRole
          selectedRole={selectedRole}
          handleChangeRole={handleChangeRole}
        />
      )}
      {activeStep === 1 && (
        <FillupInfo
          role={selectedRole}
          account={accountValues}
          info={infoValues}
          handleKeyPress={handleKeyPress}
          handleChange={handleChange}
        />
      )}
      {activeStep === 2 && (
        <CreateAccount
          account={accountValues}
          handleKeyPress={handleKeyPress}
          handleChange={handleChange}
        />
      )}
      <Stack direction="row" justifyContent="space-between" mt={2}>
        <TextButton disabled={activeStep === 0} onClick={handleBack}>
          Back
        </TextButton>
        <TextButton onClick={handleValidate}>
          {activeStep === 2 ? "Submit" : "Next"}
        </TextButton>
      </Stack>
    </Box>
  );
}

export default CustomStepper;
