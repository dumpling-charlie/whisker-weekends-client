import { useState, useEffect } from "react";
import axios from "axios";
import PetFriendlyCard from "../../components/PetFriendly/PetFriendlyCard";


function PetFriendlyPlaces() {
  const [petFriendlyPlaces, setPetFriendlyPlaces] = useState([]);

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
    <div className="PetFriendlyPage row">
      Pet Friendly Places
      {petFriendlyPlaces.map((petfriendly) => (
        <PetFriendlyCard {...petfriendly} />
      ))}
    
      <div>
        <button>
          <a href="/api/friendly/create">Add pet-friendly place</a>
        </button>
      </div>
    </div>
  );
}

export default PetFriendlyPlaces;
