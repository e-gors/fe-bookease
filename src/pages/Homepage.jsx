import { Helmet } from "react-helmet-async";

import HomepageView from "../modules/Public/sections/homepage/view/HomepageView";

// ----------------------------------------------------------------------

export default function Homepage() {
  return (
    <>
      <Helmet>
        <title> Homepage | BookEase </title>
      </Helmet>

      <HomepageView />
    </>
  );
}
