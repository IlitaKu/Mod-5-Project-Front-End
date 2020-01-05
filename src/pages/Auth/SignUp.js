import React, { useState } from "react";
import API from "../../adapters/API";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  strLength,
  passwordLenght,
  emailFormat
} from "../../utils/inputValidations";

const SignUp = props => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [errors, setErrors] = useState({
    nameError: null,
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
    password &&
    name;

  const validateName = name => {
    const isValidLenght = strLength(name);

    return isValidLenght
      ? setErrors({ ...errors, nameError: "Name is too short" })
      : setErrors({ ...errors, nameError: null });
  };

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
      API.signup({ email, password, name })
        .then(user => {
          props.setUser(user);
          history.push("/recipes");
        })

        .catch(error => {
          setErrors({ ...errors, generic: error.statusText });
        });
    }
  };
  return (
    <div className="login-form-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        {errors.generic && <h6>{errors.generic}</h6>}
        <Input
          className="login-form-input"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={e => validateName(e.target.value)}
        />
        {errors.nameError && (
          <div className="error-messages">{errors.nameError}</div>
        )}
        <Input
          className="login-form-input"
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
          className="login-form-input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={e => validatePassword(e.target.value)}
        />
        {errors.passwordError && (
          <div className="error-messages">{errors.passwordError}</div>
        )}
        <Button
          className="login-form-button"
          type="submit"
          disabled={!isImputValid}
        >
          Submit
        </Button>
      </form>

      {/* <Button onClick={props.openLogin}>Login</Button> */}
    </div>
  );
};

export default SignUp;
