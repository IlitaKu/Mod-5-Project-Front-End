const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:3000/api/v1/";
// const RECIPES = `${API_ENDPOINT}recipes` || "http://localhost:3000/recipes";
const LOGIN_URL = `${API_ENDPOINT}login`;
const SIGNUP_URL = `${API_ENDPOINT}users`;
const VALIDATE_URL = `${API_ENDPOINT}validate`;

const jsonfy = res => {
  if (!res.ok) throw res;
  return res.json().then(data => {
    if (data.errors) throw data.errors;
    else return data;
  });
};

const login = userDetails => {
  return fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ user: userDetails })
  })
    .then(jsonfy)
    .then(data => {
      localStorage.setItem("token", data.token);
      return data.user;
    });
};

const signup = userDetails => {
  return fetch(SIGNUP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ user: userDetails })
  })
    .then(jsonfy)
    .then(data => {
      localStorage.setItem("token", data.token);
      return data.user;
    });
};

const validate = () => {
  return fetch(VALIDATE_URL, {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  })
    .then(jsonfy)
    .then(data => {
      localStorage.setItem("token", data.token);
      return data.user;
    });
};

const logout = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};
export default {
  login,
  validate,
  logout,
  signup
};
