import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import playdateServices from "../../services/playdate.service";
import jwtDecode from "jwt-decode";
import Spinner from "../Spinner";
import { BsCheckCircle } from "react-icons/bs";
import { Button, Card, Form } from "react-bootstrap";

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
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => JSON.parse(option.value)
    );
    setPets(selectedOptions);
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
        navigate("/playdates");
      })
      .catch((err) =>
        console.log("Error while adding the new playdate: ", err)
      );
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: "50rem", backgroundColor: "#A8D0E6", border: "2px solid #374785" }}>
        <Card.Body>
          <h3 style={{ color: "#374785" }}>Organize a Playdate</h3>
        </Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>
              Title <br />
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Details <br />
              <Form.Control
                as="textarea"
                rows={5}
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Location <br />
              <Form.Control
                type="text"
                name="location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                required
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Date & Time <br />
              <Form.Control
                type="date"
                name="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                required
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                required
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Image
              <br />
              <Form.Control type="file" onChange={(e) => handleFileUpload(e)} />
              {uploading && (
                <>
                  Image uploading <Spinner />
                </>
              )}
              {imageUrl && <BsCheckCircle color="green" />}
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Pets Attending?
              <br />
              
              <Form.Select
                multiple
                value={pets}
                onChange={handlePetSelect}
                isValid={pets.length > 0}
              >
                {userPets.map((pet) => (
                  <option key={pet._id} value={JSON.stringify(pet)}>
                    {pet.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select at least one pet.
              </Form.Control.Feedback>
            </Form.Label>
          </Form.Group>

          <Card.Body>
            <Button
              variant="light"
              type="submit"
              disabled={!imageUrl}
              style={{ backgroundColor: "#F76C6C" }}
            >
              Create
            </Button>
          </Card.Body>
        </Form>
      </Card>
    </div>
  );
}

export default CreatePlaydatePage;
