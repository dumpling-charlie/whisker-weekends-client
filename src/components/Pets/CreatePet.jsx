import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { BsCheckCircle } from "react-icons/bs";
import {Button, Card, Form} from "react-bootstrap";

function CreatePet() {
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const [newImage, setNewImage] = useState("");
  const [newPet, setNewPet] = useState({
    name: "",
    age: 0,
    species: "",
    breed: "",
    personality: "",
    imageUrl: "",
  });

  const changeHandler = (target) => {
    setNewPet((prevState) => {
      return { ...prevState, [target.name]: target.value };
    });
  };

  // image file upload
  const handleFileUpload = (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    setUploading(true);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const imageFile = response.data.fileUrl;
        console.log("Image URL:", imageFile);
        setNewImage(imageFile);
        setNewPet((prevState) => ({
          ...prevState,
          imageUrl: imageFile,
        }));
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally(() => setUploading(false));
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log("new pet:", newPet);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/pets/`, newPet, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("submitted data:", response);
        navigate("/pets");
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="d-flex justify-content-center">
      <Card style={{ width: '40rem', backgroundColor: '#A8D0E6' }}>
      <h1 className="mt-3" style={{ color: '#374785' }}>Create Pet</h1>
      <Form onSubmit={(event) => {submitForm(event, newImage)}} className='mb-3'>
      <Form.Group>
          <Form.Label>
          {" "}
          Name:
          <Form.Control
            type="text"
            name="name"
            value={newPet.name}
            onChange={(event) => {
              changeHandler(event.target);
            }}
          />
        </Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>
          {" "}
          Age:
          <Form.Control
            type="number"
            name="age"
            value={newPet.age}
            onChange={(event) => {
              changeHandler(event.target);
            }}
          />
        </Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>
          Species:
          <Form.Control
            as="select"
            name="species"
            value={newPet.species}
            onChange={(event) => {
              changeHandler(event.target);
            }}
          >
            <option value="">select...</option>
            {["cat", "dog"].map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </Form.Control>
          </Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>
          {" "}
          Breed:
          <Form.Control
            type="text"
            name="breed"
            value={newPet.breed}
            onChange={(event) => {
              changeHandler(event.target);
            }}
          />
        </Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>
          {" "}
          Personality:
          <Form.Control
          as="select"
            name="personality"
            value={newPet.personality}
            onChange={(event) => {
              changeHandler(event.target);
            }}
          >
            <option value="">select...</option>
            {[
              "Introvert",
              "Outgoing",
              "Playful",
              "Protective",
              "Independent",
              "Affectionate",
            ].map((personality) => (
              <option key={personality} value={personality}>
                {personality}
              </option>
            ))}
          </Form.Control>
          </Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>
        <Form.Control type="file" onChange={(e) => handleFileUpload(e)} />
        {uploading && (
          <p>
            Image uploading <Spinner />
          </p>
        )}
        {newImage && <BsCheckCircle color="green" />}
        </Form.Label>
        </Form.Group>

        <Button variant="light" type="submit" style={{ backgroundColor: '#F76C6C' }}>
          Create
        </Button>
      </Form>
      </Card>
    </section>
  );
}

export default CreatePet;
