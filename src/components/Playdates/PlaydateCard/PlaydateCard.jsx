import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./PlaydateCard.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";

function PlaydateCard({ _id, imageUrl, title, description, createdBy }) {
  const { isLoggedIn } = useContext(AuthContext);

  const handleClick = () => {
    alert(
      "You must be logged in to view playdate details. Please log in or sign up."
    );
  };

  return (
    <Card Style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={title}
        className="playdateImg"
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Details: {description}</Card.Text>
        {isLoggedIn ? (
          <Link to={`/playdates/${_id}`}>
            <Button size="sm" variant="light" id='button'>
              More details
            </Button>
          </Link>
        ) : (
          <Button size="sm" variant="light" onClick={handleClick} id='button'>
            More details
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default PlaydateCard;
