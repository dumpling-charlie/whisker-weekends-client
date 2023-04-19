import React, { useState } from "react";

function StarRating({ addRating }) {
  const [rating, setRating] = useState(0);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setRating(value);
    addRating(value);
  };

  return (
    <>
      {stars.map((star, index) => (
        <span onClick={() => handleClick(index + 1)}>
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </>
  );
}

export default StarRating;
