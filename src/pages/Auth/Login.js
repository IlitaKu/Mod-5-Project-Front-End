import React, { useState } from "react";
import API from "../../adapters/API";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
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
    <div className="landing">
      <form onSubmit={handleSubmit}>
        {errors && (
          <div style={{ color: `red` }}>Email or password incorrect</div>
        )}
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
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Input type="submit" />
      </form>
      <Button>
        <Link
          to={{
            pathname: `/users`
          }}
        >
          SignUp
        </Link>
      </Button>
    </div>
  );
};

export default Login;
