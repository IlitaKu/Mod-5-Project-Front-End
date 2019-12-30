import React from "react";
import Button from "./Button.js";
import API from "../adapters/API";
const API_KEY = process.env.REACT_APP_API_KEY;
const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:3000/api/v1";
class Recipe extends React.Component {
  state = {
    shownRecipe: [],
    userId: [],
    recipeId: []
  };

  componentDidMount = async () => {
    const user = this.props.user;
    const id = this.props.recipeId;
    console.log(id);
    const req = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&${API_KEY}`
    );
    const res = await req.json();
    this.setState({ shownRecipe: res });
    this.setState({ userId: user.id });
    this.setState({ recipeId: id });
  };

  render() {
    const { closeModalOnSave, user, setUser, showButton = true } = this.props;
    // const userId = this.props.value.location.state.user;
    const saveRecipe = () => {
      const newUser = {
        ...user,
        user_recipes: [
          ...user.user_recipes,
          { spoonacular_id: this.state.recipeId }
        ]
      };
      closeModalOnSave();
      fetch(`${API_ENDPOINT}user_recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          user_id: this.state.userId,
          spoonacular_id: this.state.recipeId
        })
      })
        .then(data => data.json())
        .then(data => setUser(newUser));
      // update the user after recepe been saved
    };

    console.log("1", this.state.shownRecipe);
    const recipe = this.state.shownRecipe;

    // const ingredients = recipe.extendedIngredients.map(i => i.name);
    // const amount = recipe.extendedIngredients.map(i => i.amount);
    // const unit = recipe.extendedIngredients.map(i => i.unit);
    // const ingredientImage = recipe.extendedIngredients.map(i => i.image);
    console.log(showButton);
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
        {showButton ? <Button onClick={() => saveRecipe()}>Save</Button> : null}
      </div>
    );
  }
}
export default Recipe;
