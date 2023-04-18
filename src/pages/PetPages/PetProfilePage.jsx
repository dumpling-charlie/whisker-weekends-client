import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, Route } from "react-router-dom";


function PetProfilePage() {
    const [pet, setPet] = useState(null);
    const { petId } = useParams();
    const storedToken = localStorage.getItem('authToken');

    const getPetDetails = () => {
        axios
            .get(`http://localhost:5005/api/pets/${petId}`, { Authorization: `Bearer ${storedToken}`})
            .then(response => {
                setPet(response.data);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getPetDetails();
    }, [petId])

    const renderPetDetails = () => {
        return (
            <div>
              <h1>{pet.name}</h1>
              <Link to={`/pets/edit/${pet._id}`}>Edit Profile</Link>
            </div>
          )
    }

    return (
        <>
            {pet ? renderPetDetails() : <h1>still loading</h1>}
        </>
    )
}


export default PetProfilePage;