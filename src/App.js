import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./pages/Auth";
import Paths from "./Paths";
import API from "./adapters/API";
import Home from "./containers/Home";
import Recipe from "./components/Recipe";
import SignUp from "./pages/Auth/SignUp";
import FavRecipes from "./components/FavRecipes";
import UserItems from "./components/UserItems";

function App({ history }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.validate()
      .then(user => {
        setUser(user);
        history.push(Paths.RECIPE);
      })
      .catch(() => {
        history.push(Paths.LOGIN);
      });
  }, [history]);

  const logout = () => {
    API.logout();
    setUser(null);
    history.push(Paths.LOGIN);
  };

  return (
    <div className="App">
      {user && <button onClick={logout}>log out</button>}
      <Route
        path="/auth"
        render={routerProps => <Auth {...routerProps} setUser={setUser} />}
      />
      {user ? (
        <>
          <Route path="/recipes" render={routerProps => <Home user={user} />} />
          <Route
            path="/favourites"
            render={routerProps => <FavRecipes user={user} />}
          />
          <Route
            path="/fridger"
            render={routerProps => <UserItems user={user} />}
          />
        </>
      ) : (
        <Redirect to={Paths.LOGIN} />
      )}
      <Route path="/recipe/:id" component={Recipe} />
      <Route path="/users" component={SignUp} />
    </div>
  );
}

export default App;
