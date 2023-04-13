import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


function PetProfilePage() {
    const [pet, setPet] = useState();

    const { petId } = useParams();

    const storedToken = localStorage.getItem('authToken');


    const getPetDetails = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/pets/${petId}`, { Authorization: `Bearer ${storedToken}`})
            .then(response => {
                console.log(response.data)
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getPetDetails();
    }, [])

    return (
        <div className = "PetDetails">
            <h1>{pet}</h1>
        </div>
    )
}


export default PetProfilePage;