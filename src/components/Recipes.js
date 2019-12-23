import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Recipe from "./Recipe";
import Button from "./Button";

const Recipes = ({ recipes, user, setUser, showButton }) => {
  const [isModalOpen, setModal] = useState(false);
  const [recipeId, setRecipeId] = useState(null);

  const viewRecipe = id => {
    setRecipeId(id);
    setModal(true);
  };

  return (
    <>
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
                  <div className="button_wrapper_card">
                    <Button
                      className="recipe_button"
                      onClick={() => viewRecipe(recipe.id)}
                    >
                      View Recipe
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isModalOpen && (
        <Modal closeModal={() => setModal(false)}>
          <Recipe
            recipeId={recipeId}
            user={user}
            closeModalOnSave={() => setModal(false)}
            setUser={setUser}
            showButton={showButton}
          />
        </Modal>
      )}
    </>
  );
};

export default Recipes;
