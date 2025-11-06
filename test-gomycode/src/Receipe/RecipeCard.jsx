// RecipeCard.jsx
import React from "react";
import StarRating from "./StarRating";
import "./Receipe.css";

function RecipeCard({ recipe, onClick }) {
  return (
    <div className="card" onClick={() => onClick(recipe)}>
      <img src={recipe.image} alt={recipe.title} className="card-img" />
      <h3>{recipe.title}</h3>

      <div>
        <span>Difficulty: </span>
        <StarRating rating={recipe.difficulty} />
      </div>

      <div>
        <span>Taste: </span>
        <StarRating rating={recipe.taste} />
      </div>
    </div>
  );
}

export default RecipeCard;

