import React, { lazy, Suspense } from "react";
import { Redirect, Route } from "react-router-dom";
import Loader from "../layouts/Loader";
import { isAuth } from "../utils/helpers";

function Private(props) {
  const { component, ...rest } = props;
  const Component = lazy(() => import(`../${component}`));

  if (!isAuth()) {
    return <Route render={() => <Redirect to="/login" />} />;
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
      )}
    />
  );
}

export default Private;
