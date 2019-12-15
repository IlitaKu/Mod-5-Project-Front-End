const API_ENDPOINT = "http://localhost:3000/api/v1/";
const LOGIN_URL = `${API_ENDPOINT}login`;
const SIGNUP_URL = `${API_ENDPOINT}users`;
const VALIDATE_URL = `${API_ENDPOINT}validate`;
const SAVE_RECIPE = `${API_ENDPOINT}recipes`;

const jsonfy = res => {
  if (!res.ok) throw res;
  return res.json().then(data => {
    if (data.errors) throw data.errors;
    else return data;
  });
};
// const authHeader = () => {
//     Authorisation: localStorage.token
// }

const login = userDetails =>
  fetch(LOGIN_URL, {
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

const signup = userDetails =>
  fetch(SIGNUP_URL, {
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

const validate = () =>
  fetch(VALIDATE_URL, {
    headers: {
      Authorisation: localStorage.getItem("token")
    }
  })
    .then(jsonfy)
    .then(data => {
      localStorage.setItem("token", data.token);
      return data.user;
    });
const logout = () => {
  localStorage.removeItem("token");
};
export default {
  login,
  validate,
  logout,
  signup
};

// get ingredients for recipe
// https://api.spoonacular.com/recipes/324694/analyzedInstructions

// api request for pictures https://spoonacular.com/recipeImages/107878-556x370.jpg

// const API_KEY = "apiKey=3350d3f0b0614e2eaeedb34fcadd6c05";

// // const get_recipes = "https://api.spoonacular.com/recipes/search" + API_KEY;
// // Search recipe by ingredient
// const get_recipes = `https://api.spoonacular.com/recipes/search?query=chicken&?apiKey=3350d3f0b0614e2eaeedb34fcadd6c05`;

// // searc by multiple ingredients
// // https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2

// // const get_ingredients = () =>
// //   fetch(get_recipes_by_ingredients).then(res => res.json());

// // https://api.spoonacular.com/recipes/search?query=chicken&apiKey=3350d3f0b0614e2eaeedb34fcadd6c05

// export default {
//   get_recipes
// };
