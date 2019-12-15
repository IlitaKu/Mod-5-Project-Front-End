import React from "react";

const SearchForm = ({ getRecipe }) => (
  <div className="ui search">
    <form onSubmit={getRecipe}>
      <input
        className="prompt"
        type="text"
        name="ingredient"
        placeholder="Ingredient"
      />
      <i class="search icon"></i>
      <button className="form_button">Search</button>
    </form>
  </div>
);

export default SearchForm;
