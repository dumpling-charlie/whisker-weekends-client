import { Card } from "react-bootstrap";
import "./PetFriendlyCard.css"

function PetFriendlyCard({ _id, name, details, location }) {
  return (
    <div className="container">
    <Card className= "card">
    <Card style={{ width: "18rem"}} className="card">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{details}</Card.Text>
        <Card.Text>{location}</Card.Text>
        {/* <Button variant="primary">More details</Button> */}
      </Card.Body>
    </Card>
    </Card>
    </div>
  );
}

export default PetFriendlyCard;
