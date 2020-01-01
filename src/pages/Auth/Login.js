import React, { useState } from "react";
import API from "../../adapters/API";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { passwordLenght, emailFormat } from "../../utils/inputValidations";

const Login = props => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState({
    emailError: null,
    passwordError: null,
    generic: null
  });
  let history = useHistory();
  const isImputValid =
    !errors.nameError &&
    !errors.emailError &&
    !errors.passwordError &&
    email &&
    password;

  const validatePassword = password => {
    const isPassValid = passwordLenght(password);
    return isPassValid && !errors.passwordError
      ? setErrors({ ...errors, passwordError: "Password is too short" })
      : setErrors({ ...errors, passwordError: null });
  };

  const validateEmail = email => {
    const isEmailValid = emailFormat(email);
    return isEmailValid
      ? setErrors({ ...errors, emailError: "Email is not valid" })
      : setErrors({ ...errors, emailError: null });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isImputValid) {
      API.login({ email, password })
        .then(user => {
          console.log(" 2 login component", user);
          props.setUser(user);
          history.push("/recipes");
        })

        .catch(error => {
          console.log(errors);
          setErrors({ ...errors, generic: error.statusText });
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {errors.generic && (
          <div className="error-messages">Email or password incorrect</div>
        )}
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={e => validateEmail(e.target.value)}
        />
        {errors.emailError && (
          <div className="error-messages">{errors.emailError}</div>
        )}
        <Input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={e => validatePassword(e.target.value)}
        />
        {errors.passwordError && (
          <div className="error-messages">{errors.passwordError}</div>
        )}
        <Button type="submit" disabled={!isImputValid}>
          Submit
        </Button>
      </form>
      {/* <Button onClick={props.openSignUp}>SignUp</Button> */}
    </>
  );
};

export default Login;
