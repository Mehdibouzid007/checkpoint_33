// StarRating.jsx
import React from "react";

const StarRating = ({ rating, maxStars = 5 }) => {
  const fullStars = Math.floor(rating);
  const starsArray = [];

  for (let i = 0; i < maxStars; i++) {
    if (i < fullStars) {
      starsArray.push(<span key={i} style={{color: "#f5a623"}}>★</span>); // Filled star
    } else {
      starsArray.push(<span key={i} style={{color: "#ddd"}}>☆</span>); // Empty star
    }
  }

  return <div>{starsArray}</div>;
};

export default StarRating;

