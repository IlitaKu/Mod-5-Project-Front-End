import React, { useState } from "react";
import API from "../../adapters/API";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";

const SignUp = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
    <div className="landing">
      <form onSubmit={handleSubmit}>
        <h6>{errors}</h6>
        <Input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Input type="submit" />
      </form>
      <Button>
        <Link
          to={{
            pathname: `/auth/login`
          }}
        >
          Login
        </Link>
      </Button>
    </div>
  );
};

export default SignUp;
