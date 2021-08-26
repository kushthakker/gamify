import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, condition, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(condition);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn === condition) {
          <Component {...props} />;
        } else {
          return (
            // <Redirect
            //   to={{
            //     pathname: "/",
            //     state: { from: props.location },
            //   }}
            // />
            null
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
