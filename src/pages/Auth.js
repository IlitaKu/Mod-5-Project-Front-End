import React from "react";
import { Route } from "react-router-dom";
import AuthPages from "./Auth/AuthPages";
import About from "../components/About.js";

const Auth = props => {
  return (
    <>
      <Route path="/auth/login">
        <AuthPages setUser={props.setUser} />
        <About />
      </Route>
    </>
  );
};

export default Auth;
