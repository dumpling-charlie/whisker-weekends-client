import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddPet from '../../components/AddPet/AddPet';

function PetList() {
  const [petList, setPetList] = useState(null);
  const storedToken = localStorage.getItem('authToken');

  const loadData = () => {
    axios
      .get(`http://localhost:5005/api/pets`, { headers: {Authorization: `Bearer ${storedToken}`}})
      .then((response) => {
        setPetList(response.data);
      })
      .catch((err) => console.log(err));
  };

  const renderList = () => {
    console.log(petList);
    return (
      <section>
      <h1>this is the pet list page</h1>
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
    <>
      <h1>My Pets</h1>
      {petList ? renderList() : <h2>still loading</h2>}

      <AddPet/>
    </>
  );
}

export default PetList;
