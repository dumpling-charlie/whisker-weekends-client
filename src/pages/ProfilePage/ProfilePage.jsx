import React, { useContext } from 'react';
import { AuthContext } from "../../context/auth.context"
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={user.imageUrl} alt={user.name} width="200" />
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>USER BIO HERE</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="/profile/edit">Edit</Card.Link>
        <Card.Link href="/pets">Pets</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default ProfilePage;