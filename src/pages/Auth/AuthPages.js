import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

import Modal from "../../components/Modal";
import Button from "../../components/Button";

const AuthPages = props => {
  const [isModalOpen, setModal] = useState({ login: false, signUp: false });
  console.log(props);
  return (
    <div className="landing">
      <Button
        className="recipe_button"
        onClick={() => setModal({ signUp: false, login: true })}
      >
        Login
      </Button>

      <Button
        className="recipe_button"
        onClick={() => setModal({ signUp: true, login: false })}
      >
        SignUp
      </Button>

      {isModalOpen.login && (
        <Modal
          smallSize
          closeModal={() => setModal({ signUp: false, login: false })}
        >
          <Login
            setUser={props.setUser}
            openSignUp={() => setModal({ signUp: true, login: false })}
          />
        </Modal>
      )}

      {isModalOpen.signUp && (
        <Modal
          smallSize
          closeModal={() => setModal({ signUp: false, login: false })}
        >
          <SignUp
            setUser={props.setUser}
            openLogin={() => setModal({ signUp: false, login: true })}
          />
        </Modal>
      )}
    </div>
  );
};

export default AuthPages;
