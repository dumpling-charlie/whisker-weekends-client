import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./PetList.css";
import { Card } from "react-bootstrap";

function PetList() {
  const [petList, setPetList] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  const loadData = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/pets`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setPetList(response.data);
      })
      .catch((err) => console.log(err));
  };

  const renderList = () => {
    const handleImgLoadingError = (e) => {
      e.target.src = "/images/animal-default.jpg";
    };

    return (
      <section>
        <div className="row">
          {petList.map((pet) => {
            return (
              <div key={pet._id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={pet.imageUrl}
                    style={{ objectFit: "cover", aspectRatio: "1/1" }}
                    onError={(e) => handleImgLoadingError(e)}
                  />
                  <Card.Body>
                    <Card.Title>{pet.name}</Card.Title>
                    <Link to={`/pets/${pet._id}`}>
                      <Button variant="light">View Profile</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="pet-list">
      <h1>My Pets</h1>
      {petList ? renderList() : <h2>still loading</h2>}
      <Link to={"/pets/create"}>
        <Button variant="light">Add Pets</Button>
      </Link>
      <br />
      Are your pets lonely? Adopt from
      <Link to="https://pethubpet.netlify.app/chat" target="_blank">
        {" "}
        PetHub
      </Link>{" "}
      today!
    </div>
  );
}

export default PetList;
