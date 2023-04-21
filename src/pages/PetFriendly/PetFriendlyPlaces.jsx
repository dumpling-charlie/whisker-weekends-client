import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PetFriendlyCard from "../../components/PetFriendly/PetFriendlyCard";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./PetFriendly.css"
import { AuthContext } from "../../context/auth.context";


function PetFriendlyPlaces() {
  const [petFriendlyPlaces, setPetFriendlyPlaces] = useState([]);
const { isLoggedIn } = useContext(AuthContext);

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
        {isLoggedIn ? (
          <Link to="/friendly/create"><Button variant="light">
            Add a pet friendly place
          </Button></Link>
        ) : (
           <Link to="/playdates/create"><Button variant="light" disabled>
           Add a pet friendly place
          </Button></Link>
        )}
        </div>
      </div> 
  );
}

export default PetFriendlyPlaces;
