import { Helmet } from "react-helmet-async";

import RegisterView from "../modules/Public/sections/register/view/RegisterView";

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Register | BookEase </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
