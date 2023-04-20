import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/auth.context";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { BsGeoAlt } from "react-icons/bs";
import Button from "react-bootstrap/Button";

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
      setUserFromDb(response.data);
      console.log(response.data);
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    getUserDetails();
  }, [user._id])

  const handleImgLoadingError = (e) => {
    e.target.src = "/images/default-image.jpg";
  };
  

  return (
    <div className="d-flex justify-content-center">
    <Card style={{ width: "18rem" }}>
      {userFromDb && (
        <Card.Img
          variant="top"
          src={userFromDb.imageUrl}
          alt={userFromDb.name}
          width="200"
          onError={(e) => handleImgLoadingError(e)}
        />
      )}
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        {userFromDb && (
          <ListGroup.Item>
            <BsGeoAlt /> {userFromDb.location}{" "}
          </ListGroup.Item>
        )}
      </ListGroup>
      <ListGroup className="list-group-flush">
        {userFromDb && <ListGroup.Item>{userFromDb.bio}</ListGroup.Item>}
      </ListGroup>
      <Card.Body>
        <Link to={`/profile/edit/${user._id}`} >
          <Button className="m-1" variant="light">
            Edit
          </Button>
        </Link>
        <Link to={"/pets"}>
          <Button className="m-1" variant="light">
            Pets
          </Button>
        </Link>
      </Card.Body>
    </Card>
    </div>
  );
}

export default ProfilePage;