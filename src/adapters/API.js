const API_KEY = "?apiKey=d7e30de5f870415998ae9a0271c33940";

// const get_recipes = "https://api.spoonacular.com/recipes/search" + API_KEY;
// Search recipe by ingredient
const get_recipes = `https://api.spoonacular.com/recipes/search?query=${chicken}&${API_KEY}`;

// searc by multiple ingredients
// https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2

// const get_ingredients = () =>
//   fetch(get_recipes_by_ingredients).then(res => res.json());

export default {
  get_recipes
};
