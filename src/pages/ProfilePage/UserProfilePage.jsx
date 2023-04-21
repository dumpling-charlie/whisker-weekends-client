import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "react-bootstrap";
import { BsGeoAlt } from "react-icons/bs";

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  const getUserDetails = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/profile/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserDetails();
  }, [userId]);

  const renderUserDetails = () => {
    return (
      <div className="d-flex justify-content-center">
        <Card style={{ width: "30rem", backgroundColor: '#374785', color: 'white'}}>
          <Card.Img
            variant="top"
            src={user.imageUrl}
            alt={user.name}
            className="mx-auto d-block rounded-circle"
            style={{ height: "20rem", width: "20rem", objectFit: "cover", objectPosition: "center",}}
          />
            <hr/>
          <h1 style={{ color: '#F76C6C' }}>{user.name}</h1>
          <p><BsGeoAlt /> {user.location}</p>
          <hr/>
          <p>About me: <br/><span style={{ fontStyle: "italic" }}>{user.bio}</span></p>
        </Card>
      </div>
    );
  };

  return <>{user ? renderUserDetails() : <h1>still loading</h1>}</>;
}

export default UserProfilePage;
