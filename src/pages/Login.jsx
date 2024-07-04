import { Helmet } from "react-helmet-async";

import LoginView from "../modules/Public/sections/login/view/LoginView";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | BookEase </title>
      </Helmet>

      <LoginView />
    </>
  );
}
