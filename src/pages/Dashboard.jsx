import { Helmet } from "react-helmet-async";

import DashboardView from "../modules/Private/sections/dashboard/view/DashboardView";

// ----------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | BookEase </title>
      </Helmet>

      <DashboardView />
    </>
  );
}
