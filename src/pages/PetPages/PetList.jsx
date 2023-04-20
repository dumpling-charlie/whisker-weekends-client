import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./PetList.css"
import { Card } from "react-bootstrap";

function PetList() {
  const [petList, setPetList] = useState(null);
  const storedToken = localStorage.getItem('authToken');

  const loadData = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/pets`, { headers: {Authorization: `Bearer ${storedToken}`}})
      .then((response) => {
        setPetList(response.data);
      })
      .catch((err) => console.log(err));
  };

  const renderList = () => {
    return (
    <section>
    <div className="row">
      {petList.map((pet, index) => {
        return (
          <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={pet.imageUrl}
              style={{ objectFit: "cover", aspectRatio: "1/1" }}
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
      <Button variant="light">
        <Link to={"/pets/create"}>Add Pets</Link>
      </Button>
      <br />
      Are your pets lonely?
      <Link to="https://pethubpet.netlify.app/chat"> Adopt</Link> one now!
    </div>
  );
}

export default PetList;
