// RecipeCard.jsx
import React, { useState } from "react";
import StarRating from "./StarRating";
import "./Receipe.css";

function RecipeCard({ recipe, onClick }) {
  const [imgError, setImgError] = useState(false);
  const defaultImage = "https://via.placeholder.com/400x300?text=Recipe+Image";

  const handleImageError = (e) => {
    console.error('Image failed to load:', recipe.image, e);
    setImgError(true);
  };

  // Debug: log image URL
  React.useEffect(() => {
    if (recipe?.image) {
      console.log('Recipe image URL:', recipe.title, recipe.image);
    } else {
      console.warn('Recipe missing image:', recipe?.title);
    }
  }, [recipe]);

  const imageUrl = recipe?.image?.trim() || '';
  const finalImageSrc = imgError || !imageUrl ? defaultImage : imageUrl;

  return (
    <div className="card" onClick={() => onClick(recipe)}>
      {imageUrl && !imgError ? (
        <img 
          src={imageUrl} 
          alt={recipe?.title || 'Recipe'} 
          className="card-img"
          onError={handleImageError}
          loading="lazy"
        />
      ) : (
        <div className="card-img" style={{ 
          backgroundColor: '#f0f0f0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#999',
          fontSize: '14px'
        }}>
          {imgError ? 'Image failed to load' : 'No image'}
        </div>
      )}
      <h3>{recipe?.title || 'Untitled Recipe'}</h3>

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

