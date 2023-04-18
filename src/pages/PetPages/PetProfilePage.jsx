import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


function PetProfilePage() {
    const [pet, setPet] = useState(null);
    const { petId } = useParams();
    const storedToken = localStorage.getItem('authToken');

    const getPetDetails = () => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/pets/${petId}`, { Authorization: `Bearer ${storedToken}`})
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
                <img src={pet.imageUrl} alt="`photo of ${pet.name}`" width="200"/>
                <h1>{pet.name}</h1>
                <p>age: {pet.age}</p>
                <p>species: {pet.species}</p>
                <p>breed: {pet.breed}</p>
                <p>personality: {pet.personality}</p>
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