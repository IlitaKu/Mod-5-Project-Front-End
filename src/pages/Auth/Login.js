import React, { useState } from "react";
import API from "../../adapters/API";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
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
        setErrors(true);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {errors && (
          <div style={{ color: `red` }}>Email or password incorrect</div>
        )}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input type="submit"></input>
      </form>
      <button>
        <Link
          to={{
            pathname: `/users`
          }}
        >
          SignUp
        </Link>
      </button>
    </div>
  );
};

export default Login;
