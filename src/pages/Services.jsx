import { Helmet } from "react-helmet-async";

import ServicesView from "../modules/Private/sections/services/view/ServicesView";

// ----------------------------------------------------------------------

export default function Services() {
  return (
    <>
      <Helmet>
        <title> Services | BookEase </title>
      </Helmet>

      <ServicesView />
    </>
  );
}
