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
        <Card style={{ width: "20rem", backgroundColor: '#374785', color: 'white'}}>
          <Card.Img
            variant="top"
            src={user.imageUrl}
            alt={user.name}
            style={{ objectFit: "cover", aspectRatio: "1/1" }}
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
