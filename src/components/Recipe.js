import React from "react";
import Button from "./Button.js";
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

    const req = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&${API_KEY}`
    );
    const res = await req.json();
    this.setState({ shownRecipe: res });
    this.setState({ userId: user.id });
    this.setState({ recipeId: id });
  };

  render() {
    const {
      closeModalOnSave,
      user,
      setUser,
      recipeImage,
      showButton = true
    } = this.props;
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
    const recipe = this.state.shownRecipe;

    // const ingredients = recipe.extendedIngredients.map(i => i.name);
    // const amount = recipe.extendedIngredients.map(i => i.amount);
    // const unit = recipe.extendedIngredients.map(i => i.unit);
    // const ingredientImage = recipe.extendedIngredients.map(i => i.image);
    return (
      <div className="recipe-card">
        {this.state.shownRecipe.length !== 0 && (
          <div className="list-of-ingredients">
            <h2>{recipe.title}</h2>
            <h5 className="ListNames">Ingredients:</h5>
            <div className="ingredients-wrapper">
              <ol id="menu">
                {recipe.extendedIngredients &&
                  recipe.extendedIngredients.map(i => (
                    <li className="listed-ingredients">
                      {i.name}: {i.amount}
                      {i.unit}
                    </li>
                  ))}
                {/* {recipe.extendedIngredients.map(i => (
                <li className="listed-amount">{i.amount}</li>
              ))}
              {recipe.extendedIngredients.map(i => (
                <li className="listed-unit">{i.unit}</li>
              ))} */}
              </ol>
              {recipeImage && (
                <img className="recipe-card-image" src={recipeImage} alt="" />
              )}
            </div>
          </div>
        )}
        {recipe.instructions && (
          <>
            <h5>Method:</h5>
            <p className="recipe-method">{recipe.instructions}</p>
          </>
        )}
        {showButton ? (
          <div className="button-wrapper">
            <Button onClick={() => saveRecipe()}>Add to favs</Button>
          </div>
        ) : null}
      </div>
    );
  }
}
export default Recipe;
