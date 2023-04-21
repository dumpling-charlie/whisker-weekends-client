import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { BsGeoAlt } from "react-icons/bs";
import Button from "react-bootstrap/Button";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [userFromDb, setUserFromDb] = useState(null);

  const getUserDetails = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/profile/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserFromDb(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleImgLoadingError = (e) => {
    e.target.src = "/images/default-image.jpg";
  };

  return (
    <div className="d-flex justify-content-center">
      <Card
        style={{ width: "30rem", backgroundColor: "#374785", color: "white" }}
      >
        {userFromDb && (
          <Card.Img
            variant="top"
            src={userFromDb.imageUrl}
            alt={userFromDb.name}
            className="mx-auto d-block rounded-circle"
            style={{ height: "20rem", width: "20rem", objectFit: "cover", objectPosition: "center",}}
            onError={(e) => handleImgLoadingError(e)}
          />
        )}
        <Card.Body>
          <Card.Title style={{ color: "#F76C6C" }}>{user.name}</Card.Title>
        </Card.Body>

        {userFromDb && (
          <p>
            {" "}
            <BsGeoAlt /> {userFromDb.location}{" "}
          </p>
        )}

        {userFromDb && <p> {userFromDb.bio} </p>}

        <Card.Body>
          <Link to={`/profile/edit/${user._id}`}>
            <Button
              className="m-1"
              variant="light"
              style={{ backgroundColor: "#F76C6C" }}
            >
              Edit
            </Button>
          </Link>
          <Link to={"/pets"}>
            <Button
              className="m-1"
              variant="light"
              style={{ backgroundColor: "#F76C6C" }}
            >
              Pets
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfilePage;
