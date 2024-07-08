import { Helmet } from "react-helmet-async";

import UserView from "../modules/Private/sections/user/view/UserView";

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Users | BookEase </title>
      </Helmet>

      <UserView />
    </>
  );
}
