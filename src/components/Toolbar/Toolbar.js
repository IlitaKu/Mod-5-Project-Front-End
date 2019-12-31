import React from "react";
import API from "../../adapters/API";
import { Link } from "react-router-dom";
import Paths from "../../Paths";

const toolbar = props => {
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
            style={{ fontSize: 20, color: "black" }}
          >
            Recipes
          </Link>
        </div>
        <div className="toolbar-logout">
          <Link
            to={{
              pathname: Paths.LOGIN
            }}
            style={{ fontSize: 18, color: "black" }}
          >
            LogOut
          </Link>
        </div>
        {/* </ul> */}
      </nav>
    </header>
  );
};

export default toolbar;
