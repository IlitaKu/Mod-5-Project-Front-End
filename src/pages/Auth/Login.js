import React, { useState } from "react";
import API from "../../adapters/API";
import { useHistory } from "react-router-dom";

const Login = props => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [errors, setErrors] = useState([]);
  let history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    API.login({ email, password })
      .then(user => {
        console.log(user);
        props.setUser(user);
        history.push("/recipes");
      })

      .catch(errors => {
        console.log(errors);
        setErrors(errors);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h6>{errors.join()}</h6>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input type="submit"></input>
    </form>
  );
};

export default Login;
