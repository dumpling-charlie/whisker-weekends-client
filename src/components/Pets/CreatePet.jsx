import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { BsCheckCircle } from "react-icons/bs";

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
    <section>
      <h1>Create Pet</h1>
      <form
        onSubmit={(event) => {
          submitForm(event, newImage);
        }}
      >
        <label>
          {" "}
          Name:
          <input
            type="text"
            name="name"
            value={newPet.name}
            onChange={(event) => {
              changeHandler(event.target);
            }}
          />
        </label>

        <label>
          {" "}
          Age:
          <input
            type="number"
            name="age"
            value={newPet.age}
            onChange={(event) => {
              changeHandler(event.target);
            }}
          />
        </label>

        <label>
          Species:
          <select
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
          </select>
        </label>

        <label>
          {" "}
          Breed:
          <input
            type="text"
            name="breed"
            value={newPet.breed}
            onChange={(event) => {
              changeHandler(event.target);
            }}
          />
        </label>

        <label>
          {" "}
          Personality:
          <select
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
          </select>
        </label>

        <input type="file" onChange={(e) => handleFileUpload(e)} />
        {uploading && (
          <p>
            Image uploading <Spinner />
          </p>
        )}
        {newImage && <BsCheckCircle color="green" />}

        <button type="submit" disabled={!newImage}>
          Create
        </button>
      </form>
    </section>
  );
}

export default CreatePet;
