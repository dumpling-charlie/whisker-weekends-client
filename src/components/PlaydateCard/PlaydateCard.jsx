import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PlaydateLike from "../PlaydateLike";
import "./PlaydateCard.css"

function PlaydateCard({ _id, imageUrl, title, description, createdBy }) {
  const userId = localStorage.getItem("authToken");

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
        <Card.Text>{description}</Card.Text>
        <Card.Text>{createdBy}</Card.Text>
        <Link to={`/api/playdates/${_id}`}>
          <Button>More details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default PlaydateCard;
