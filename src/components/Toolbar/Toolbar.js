import React from "react";

import { Link } from "react-router-dom";

import { ReactComponent as Chef } from "../../assets/Chef.svg";

const Toolbar = ({ logout }) => {
  return (
    <header className="toolbar">
      <nav className="toolbar_navigation">
        <div>
          <Link
            to={{
              pathname: `/recipes`
            }}
          >
            <Chef className="icon" />
            <span className="toolbar-logo">Fridger</span>
          </Link>
        </div>
        <div>
          <Link
            className="toolbar-section"
            to={{
              pathname: `/fridger`
            }}
          >
            My Fridge
          </Link>
          <Link
            className="toolbar-section"
            to={{
              pathname: `/favourites`
            }}
          >
            Favs
          </Link>
          <button
            className="toolbar-logout toolbar-section"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Toolbar;
