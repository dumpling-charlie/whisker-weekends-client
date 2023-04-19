import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function PetProfilePage() {
    const [pet, setPet] = useState(null);
    const { petId } = useParams();
    const [ownerId, setOwnerId] = useState(null);
    const storedToken = localStorage.getItem('authToken');
    const { user } = useContext(AuthContext);

    const getPetDetails = () => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/pets/${petId}`, { Authorization: `Bearer ${storedToken}`})
            .then(response => {
                setPet(response.data);
                setOwnerId(response.data.owner._id);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getPetDetails();
    }, [petId])

   const canEdit = pet && user && ownerId === user._id;

    const renderPetDetails = () => {
        return (
            <div>
                <img src={pet.imageUrl} alt="`photo of ${pet.name}`" width="200"/>
                <h1>{pet.name}</h1>
                <p>age: {pet.age}</p>
                <p>species: {pet.species}</p>
                <p>breed: {pet.breed}</p>
                <p>personality: {pet.personality}</p>
                {canEdit &&
                    <Link to={`/pets/edit/${pet._id}`}>Edit Profile</Link>
                } 
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