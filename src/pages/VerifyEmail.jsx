import React from "react";
import { Helmet } from "react-helmet-async";
import VerifyEmailView from "../modules/Public/sections/verify/view/VerifyEmailView";

function VerifyEmail() {
  return (
    <>
      <Helmet>
        <title>Verify Account | BookEase</title>
      </Helmet>

      <VerifyEmailView />
    </>
  );
}

export default VerifyEmail;
