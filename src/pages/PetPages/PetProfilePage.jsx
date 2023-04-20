import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

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
        const handleImgLoadingError = (e) => {
          e.target.src = "/images/animal-default.jpg";}
          return (
            <div className="d-flex justify-content-center">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={pet.imageUrl}
                style={{ objectFit: "cover", aspectRatio: "1/1" }}
                onError={(e) => handleImgLoadingError(e)}
              />
              <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>{pet.age} years old</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Species: {pet.species}</ListGroup.Item>
                <ListGroup.Item>Breed: {pet.breed}</ListGroup.Item>
                <ListGroup.Item>Personality: {pet.personality}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                {canEdit && (
                  <Link to={`/pets/edit/${pet._id}`}>
                    <Button variant="light">Edit Profile</Button>
                  </Link>
                )}
              </Card.Body>
            </Card>
            </div>
          );
        };


    return (
        <>
            {pet ? renderPetDetails() : <h1>still loading</h1>}
        </>
    )
}


export default PetProfilePage;