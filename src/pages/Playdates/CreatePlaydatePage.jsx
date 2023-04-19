import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import playdateServices from "../../services/playdate.service";
import jwtDecode from "jwt-decode";
import Spinner from "../../components/Spinner";
import { BsCheckCircle } from "react-icons/bs";

function CreatePlaydatePage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [userPets, setUserPets] = useState([]);
  const [pets, setPets] = useState([]);

  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);

      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/api/pets/?owner=${decodedToken._id}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((response) => {
          setUserPets(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [storedToken]);

  // handle pet multi select
  const handlePetSelect = (event) => {
    const selectedPets = Array.from(event.target.selectedOptions, (option) =>
      JSON.parse(option.value)
    );
    setPets(selectedPets);
  };

  // ******** this method handles the file upload ********
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
        console.log("response is: ", response);
        // Parse the response
        const imageUrl = response.data.fileUrl;
        setImageUrl(imageUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally(() => setUploading(false));
  };

  // ********  this method submits the form ********
  const handleSubmit = (e) => {
    e.preventDefault();

    playdateServices
      .createPlaydate({
        title,
        location,
        date,
        time,
        description,
        imageUrl,
        pets,
      })
      .then((res) => {
        navigate("/api/playdates");
      })
      .catch((err) =>
        console.log("Error while adding the new playdate: ", err)
      );
  };

  return (
    <div>
      <h1>Create a Playdate</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="time">Time</label>
          <input
            type="time"
            name="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            required
          />
        </div>

        <input type="file" onChange={(e) => handleFileUpload(e)} />
        {uploading && (
          <p>
            Image uploading <Spinner />
          </p>
        )}
        {imageUrl && <BsCheckCircle color="green" />}

        <div>
          <label htmlFor="pets">Pets</label>
          <select name="pets" multiple value={pets} onChange={handlePetSelect}>
            {userPets &&
              userPets.map((pet) => (
                <option key={pet._id} value={JSON.stringify(pet)}>
                  {pet.name}
                </option>
              ))}
          </select>
        </div>
        <button type="submit" disabled={!imageUrl}>
          Create
        </button>
      </form>
    </div>
  );
}

export default CreatePlaydatePage;
