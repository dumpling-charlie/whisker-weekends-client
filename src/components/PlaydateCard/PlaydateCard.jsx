import { Link } from "react-router-dom";
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
          <Link to={`/api/playdates/${_id}`}>
          <Button>More details</Button>
        </Link> ):(       
          <Button onClick={handleClick}>More details</Button>
          )}        
      </Card.Body>
    </Card>
  );
}

export default PlaydateCard;
