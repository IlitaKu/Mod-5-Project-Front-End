import React from "react";
import SearchForm from "../components/SearchForm";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";

const Home = ({ user, setUser }) => {
  let history = useHistory();
  console.log(" 3 home component", user);
  return (
    <div>
      <SearchForm user={user} setUser={setUser} />
      {/* <Recipes recipes={this.state.recipes} user={user} /> */}
      <Button
        className="back-to-recipes"
        onClick={() => history.push("/favourites")}
      >
        View fav
      </Button>
      <Button
        className="back-to-recipes"
        onClick={() => history.push("/fridger")}
      >
        View your items
      </Button>

      <Button
        className="back-to-recipes"
        onClick={() => history.push("/suggestions")}
      >
        Today's suggestions
      </Button>
    </div>
  );
};

export default Home;
