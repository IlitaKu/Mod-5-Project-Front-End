import React from "react";
import { Link } from "react-router-dom";

const Recipes = ({ recipes, user }) => (
  <div className="container">
    <div className="grid">
      {recipes.map(recipe => {
        return (
          <div
            key={recipe.id}
            className="card"
            style={{ marginBottom: "2rem" }}
          >
            <div className="recipes__box">
              <div className="recipe__box-img">
                <img
                  src={`https://spoonacular.com/recipeImages/${recipe.id}-480x360.jpg`}
                  alt={recipe.title}
                />
              </div>
              <div className="recipe__text">
                <h5 className="recipes__title">
                  {recipe.title.length < 20
                    ? `${recipe.title}`
                    : `${recipe.title.substring(0, 25)}...`}
                </h5>
              </div>
              <button className="recipe_button">
                <Link
                  to={{
                    pathname: `/recipe/${recipe.id}`,
                    state: { recipe: recipe.id, user: user.id }
                  }}
                >
                  View Recipe
                </Link>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default Recipes;
