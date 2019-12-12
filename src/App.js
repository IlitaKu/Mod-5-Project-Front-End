import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./pages/Auth";
import Paths from "./Paths";
import API from "./adapters/API";

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
          <Route
            path="/recipes"
            render={routerProps => <div>new recipe</div>}
          />
        </>
      ) : (
        <Redirect to={Paths.LOGIN} />
      )}
    </div>
  );
}

export default App;
