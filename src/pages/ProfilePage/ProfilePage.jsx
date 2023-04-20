import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/auth.context";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem('authToken');
  const [userFromDb, setUserFromDb] = useState(null);

  const getUserDetails = () => {
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/profile/${user._id}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then(response => {
      console.log(response.data);
      setUserFromDb(response.data);
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    getUserDetails();
  }, [user._id])
  

  return (
    <Card style={{ width: "18rem" }}>
      {userFromDb && <Card.Img variant="top" src={userFromDb.imageUrl} alt={userFromDb.name} width="200" />}
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>USER BIO HERE</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Link to={`/profile/edit/${user._id}`}>Edit</Link>
        <Link to={"/pets"}>Pets</Link>
      </Card.Body>
    </Card>
  );
}

export default ProfilePage;