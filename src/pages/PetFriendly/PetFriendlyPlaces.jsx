import { useState, useEffect } from "react";
import axios from "axios";
import PetFriendlyCard from "../../components/PetFriendly/PetFriendlyCard";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./PetFriendly.css"


function PetFriendlyPlaces() {
  const [petFriendlyPlaces, setPetFriendlyPlaces] = useState([]);
    const userId = localStorage.getItem("authToken");
  const isAuthenticated = !!userId;

  const getAllPlaces = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/friendly`)
      .then((response) => setPetFriendlyPlaces(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPlaces();
  }, []);

  return (
    <div className="full-page">
    <div className="row">
    <div>
      Pet Friendly Places
      </div>
      <br/>
      {petFriendlyPlaces.map((petfriendly) => (
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
        <PetFriendlyCard {...petfriendly} />
      </div>))}
        {isAuthenticated ? (
          <Button variant="light">
            <Link to="/friendly/create">Add a pet friendly place</Link>
          </Button>
        ) : (
          <Button variant="light" disabled>
            <Link to="/playdates/create">Add a pet friendly place</Link>
          </Button>
        )}
        </div>
      </div> 
  );
}

export default PetFriendlyPlaces;
