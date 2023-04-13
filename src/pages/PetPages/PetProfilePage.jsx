import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


function PetProfilePage() {
    const [pet, setPet] = useState();

    const { petId } = useParams();

    const storedToken = localStorage.getItem('authToken');

    const getPetDetails = () => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/pets/${petId}`, { Authorization: `Bearer ${storedToken}`})
            .then(response => {
                console.log(response.data)
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