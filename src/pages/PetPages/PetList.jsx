import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./PetList.css"

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
      {petList.map((pet, index) => {
        return (
          <div key={index}>
            <img src={pet.imageUrl} alt="pet" width="200" />
            <h3>{pet.name}</h3>
            <Link to={`/pets/${pet._id}`}> View Profile </Link>
          </div>
        );
      })}
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

      <Button>
          <Link to={"/pets/create"}>Add Pets</Link>
      </Button>
<br/>
      Are your pets lonely?<Link to="https://pethubpet.netlify.app/chat"> Adopt</Link> one now!

    </div>
  );
}

export default PetList;
