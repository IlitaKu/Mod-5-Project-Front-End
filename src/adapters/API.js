const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:3000/api/v1/";
const RECIPES = `${API_ENDPOINT}recipes` || "http://localhost:3000/recipes";
const LOGIN_URL = `${API_ENDPOINT}login`;
const SIGNUP_URL = `${API_ENDPOINT}users`;
const VALIDATE_URL = `${API_ENDPOINT}validate`;
const USER_RECIPES = `${API_ENDPOINT}recipe_users`;

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
      console.log(data);
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
      console.log(data);
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
// external api get recipes by ids https://api.spoonacular.com/recipes/informationBulk?ids=715538,716429
//  get a sponacular api form "http://localhost:3000/api/v1/user_recipes/:id "
// get ingredients for recipe
// https://api.spoonacular.com/recipes/324694/analyzedInstructions

// api request for pictures https://spoonacular.com/recipeImages/107878-556x370.jpg

// // const get_recipes = "https://api.spoonacular.com/recipes/search" + API_KEY;
// // Search recipe by ingredient
// const get_recipes = `https://api.spoonacular.com/recipes/search?query=chicken&?apiKey;

// // searc by multiple ingredients
// // https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2

// // const get_ingredients = () =>
// //   fetch(get_recipes_by_ingredients).then(res => res.json());

// // https://api.spoonacular.com/recipes/search?query=chicken&apiKey=3350d3f0b0614e2eaeedb34fcadd6c05

// export default {
//   get_recipes
// };
