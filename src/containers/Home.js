import React from "react";
import SearchForm from "../components/SearchForm";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";

const Home = ({ user, setUser }) => {
  let history = useHistory();
  return (
    <div>
      <div className="display-text">
        <h1 className="header">Get Inspired</h1>
        <div className="sub-header">
          Browse through suggestions or search by ingredients
        </div>
      </div>

      <SearchForm user={user} setUser={setUser} />
    </div>
  );
};

export default Home;
