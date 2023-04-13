import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddPet from '../../components/AddPet/AddPet';

function PetList() {
  const [petList, setPetList] = useState(null);

  const loadData = () => {
    axios
      .get(`http://localhost:5005/api/pets/`)
      .then((response) => {
        console.log(response);
        setPetList(response.data);
      })
      .catch((err) => console.error(err));
  };

  const renderList = () => {
    return (
      <section>
        <h1>this is the pet list page</h1>
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
