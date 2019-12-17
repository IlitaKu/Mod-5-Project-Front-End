import React from "react";
import { Route } from "react-router-dom";
import Login from "./Auth/Login";

const Auth = props => {
  return (
    <>
      <Route path="/auth/login">
        <Login setUser={props.setUser} />
      </Route>
      {/* <Route path="/auth/signup">
        <div>Signup</div>
      </Route> */}
    </>
  );
};

export default Auth;
