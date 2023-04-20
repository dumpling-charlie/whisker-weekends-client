import { Card } from "react-bootstrap";
import "./PetFriendlyCard.css"
import StarRating from "../../components/Rating/StarRating";
import RatingSummary from "../../components/Rating/RatingSummary";
import { useState } from "react";

function PetFriendlyCard({ _id, name, details, location }) {
  const [ratings, setRatings] = useState([]);

  const addRating = (rating) => {
    setRatings([...ratings, rating]);
  };
  return (
      <Card className="card">
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{details}</Card.Text>
            <Card.Text>{location}</Card.Text>
            <Card.Text><StarRating  addRating={addRating} /></Card.Text>
            <Card.Text><RatingSummary ratings={ratings} /></Card.Text>
          </Card.Body>
        </Card>
  );
}

export default PetFriendlyCard;
