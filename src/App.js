import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./pages/Auth";
import Paths from "./Paths";
import API from "./adapters/API";
import Home from "./containers/Home";
import SignUp from "./pages/Auth/SignUp";
import FavRecipes from "./components/FavRecipes";
import UserItems from "./components/UserItems";
import Button from "./components/Button";
import Suggestions from "./components/Suggestions";
import Toolbar from "./components/Toolbar/Toolbar";
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
      {/* {user && <Button onClick={logout}>log out</Button>} */}
      <Route
        path="/auth"
        render={routerProps => <Auth {...routerProps} setUser={setUser} />}
      />
      {user ? (
        <>
          <Route
            path="/recipes"
            render={routerProps => <Home user={user} setUser={setUser} />}
          />
          <Route
            path="/favourites"
            render={routerProps => <FavRecipes user={user} setUser={setUser} />}
          />
          <Route
            path="/fridger"
            render={routerProps => <UserItems user={user} setUser={setUser} />}
          />
          <Route
            path="/suggestions"
            render={routerProps => (
              <Suggestions user={user} setUser={setUser} />
            )}
          />
        </>
      ) : (
        <Redirect to={Paths.LOGIN} />
      )}
      <Route
        path="/users"
        component={routerProps => <SignUp {...routerProps} setUser={setUser} />}
      />
    </div>
  );
}

export default App;
