import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import Loader from "../layouts/Loader";
import PublicAppBar from "../layouts/PublicAppBar";
import Footer from "../layouts/Footer";

function Public(props) {
  const { component, ...rest } = props;
  const Component = lazy(() => import(`../${component}`));

  return (
    <Route
      {...rest}
      render={(props) => (
        <Suspense fallback={<Loader />}>
          <PublicAppBar />
          <Component {...props} />
          <Footer />
        </Suspense>
      )}
    />
  );
}

export default Public;
