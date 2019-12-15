import React, { useState } from "react";
import API from "../../adapters/API";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = props => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [name, setName] = useState(" ");
  const [errors, setErrors] = useState([]);
  let history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    API.signup({ email, password, name })
      .then(user => {
        console.log(user);
        props.setUser(user);
        history.push("/recipes");
      })

      .catch(error => {
        console.log(errors);
        setErrors(errors);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h6>{errors.join()}</h6>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input type="submit"></input>
      </form>
      <button>
        <Link
          to={{
            pathname: `/auth/login`
          }}
        >
          Login
        </Link>
      </button>
    </div>
  );
};

export default SignUp;
