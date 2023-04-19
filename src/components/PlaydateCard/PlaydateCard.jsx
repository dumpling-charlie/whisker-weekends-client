import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PlaydateLike from "../PlaydateLike";
import "./PlaydateCard.css";


function PlaydateCard({ _id, imageUrl, title, description, createdBy }) {
  const userId = localStorage.getItem("authToken");
  const isAuthenticated = !!userId;

  const handleClick =() => {
    alert("You must be logged in to view playdate details. Please log in or sign up.")
  }
  

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
        {isAuthenticated ? (
          <Button href={`/api/playdates/${_id}`} size="sm" variant="outline-secondary">
            More details
          </Button>
        ) : (
          <Button size="sm" variant="light" onClick={handleClick}>
            More details
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default PlaydateCard;
