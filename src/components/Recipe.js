import React from "react";
import { Link } from "react-router-dom";

const API_KEY = "apiKey=3350d3f0b0614e2eaeedb34fcadd6c05";
class Recipe extends React.Component {
  state = {
    shownRecipe: []
  };
  componentDidMount = async () => {
    const id = this.props.location.state.recipe;
    const req = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&${API_KEY}`
    );
    const res = await req.json();
    this.setState({ shownRecipe: res });
  };

  render() {
    const saveRecipe = id => {
      //
    };
    console.log("1", this.state.shownRecipe);
    const recipe = this.state.shownRecipe;
    // const ingredients = recipe.extendedIngredients.map(i => i.name);
    // const amount = recipe.extendedIngredients.map(i => i.amount);
    // const unit = recipe.extendedIngredients.map(i => i.unit);
    // const ingredientImage = recipe.extendedIngredients.map(i => i.image);
    return (
      <div>
        {this.state.shownRecipe.length !== 0 && (
          <div className="row">
            {recipe.extendedIngredients.map(i => (
              <li>Ingredients: {i.name}</li>
            ))}
            {recipe.extendedIngredients.map(i => (
              <li>Amount: {i.amount}</li>
            ))}
          </div>
        )}
        <p>{recipe.instructions}</p>
        <button onClick={() => saveRecipe(recipe.id)}>Save</button>
      </div>
    );
  }
}
export default Recipe;
