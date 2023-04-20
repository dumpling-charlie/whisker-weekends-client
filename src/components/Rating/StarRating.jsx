import React, { useState } from "react";

function StarRating({ onAddRating }) {
  const [rating, setRating] = useState(0);
  const maxRating = 5;

  const handleClick = (value) => {
    setRating(value);
    onAddRating(value);
  };

  const renderStars =() => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      const filled = i <= rating;
    stars.push(
      <span key={i} onClick={() => handleClick(i)}>
        {filled ? "★" : "☆"}
      </span>
    )    }
  }

  return (
    <>
      <p>Been here? Rate it:</p>
      {renderStars()}
    </>
  );
}

export default StarRating;
