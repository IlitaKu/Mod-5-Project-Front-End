import React from "react";
import API from "../../adapters/API";
import { Link } from "react-router-dom";
import Paths from "../../Paths";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";

const Toolbar = ({ logout }) => {
  let history = useHistory();
  return (
    <header className="toolbar">
      <nav className="toolbar_navigation">
        <div></div>
        {/* <ul id="nav"> */}
        <div className="toolbar-logo">
          <Link
            to={{
              pathname: `/recipes`
            }}
            style={{ fontSize: 30, color: "green" }}
          >
            Fridger
          </Link>
        </div>
        <Button
          className="back-to-recipes"
          onClick={() => history.push("/fridger")}
        >
          My Fridge
        </Button>
        <Button
          className="back-to-recipes"
          onClick={() => history.push("/favourites")}
        >
          Favs
        </Button>
        <Button className="toolbar-logout" onClick={() => logout()}>
          Logout
        </Button>
        {/* </ul> */}
      </nav>
    </header>
  );
};

export default Toolbar;
