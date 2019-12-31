import React from "react";
import { Route } from "react-router-dom";
import AuthPages from "./Auth/AuthPages";

const Auth = props => {
  return (
    <>
      <Route path="/auth/login">
        <AuthPages setUser={props.setUser} />
      </Route>
    </>
  );
};

export default Auth;
