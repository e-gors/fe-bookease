import React from "react";
import { Helmet } from "react-helmet-async";
import CustomStepper from "../modules/Public/sections/register/components/CustomStepper";

function CompleteRegistration() {
  return (
    <>
      <Helmet>
        <title>Complete Registration | BookEase</title>
      </Helmet>

      <CustomStepper />
    </>
  );
}

export default CompleteRegistration;
