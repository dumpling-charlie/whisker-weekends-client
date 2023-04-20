import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { BsCheckCircle } from "react-icons/bs";
import { Button, Card, Form, Image } from "react-bootstrap";

function EditPetProfilePage() {
  const storedToken = localStorage.getItem("authToken");
  const [pet, setPet] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    personality: "",
    imageUrl: "",
  });
  const { petId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/pets/${petId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const onePet = response.data;
        setPet(onePet);

        setImageUrl(onePet.imageUrl);

        setFormData({
          name: onePet.name,
          age: onePet.age,
          personality: onePet.personality,
        });
      })
      .catch((error) => console.log(error));
  }, [petId]);

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
        const imageUrl = response.data.fileUrl;
        setNewImageFile(imageUrl);
        setFormData((prevState) => ({
          ...prevState,
          imageUrl: imageUrl,
        }));
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally(() => setUploading(false));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const uploadData = new FormData();

    if (newImageFile) {
      uploadData.append("imageUrl", newImageFile);
    } else {
      uploadData.append("imageUrl", imageUrl);
    }

    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/api/pets/${petId}`, formData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => navigate("/pets"))
      .catch((err) => console.error(err));
    console.log(formData);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const deletePet = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/pets/${petId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => navigate("/pets"))
      .catch((err) => console.log(err));
  };

  return (
    <section className="d-flex justify-content-center">
      <Card style={{ width: "40rem", backgroundColor: "#A8D0E6", border: "2px solid #374785" }}>
        <h1 className="mt-3" style={{ color: "#374785" }}>
          Edit Pet Details
        </h1>
        {pet && (
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>
                {" "}
                Name:
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                />
              </Form.Label>
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>
                {" "}
                Age:
                <Form.Control
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                />
              </Form.Label>
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>
                {" "}
                Personality:
                <Form.Control
                  as="select"
                  name="personality"
                  value={formData.personality}
                  onChange={handleFormChange}
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
            <br />
            <Form.Group>
              <Form.Label>
                {" "}
                <Image
                  src={newImageFile || imageUrl}
                  alt="current pet image"
                  className="mx-auto d-block rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <Form.Control
                  type="file"
                  onChange={(e) => handleFileUpload(e)}
                />
                {uploading && (
                  <p>
                    Image uploading
                    <Spinner />
                  </p>
                )}
                {newImageFile && <BsCheckCircle color="green" />}
              </Form.Label>
            </Form.Group>
            <br />
            <Button
              variant="light"
              type="submit"
              className="mb-3"
              style={{ backgroundColor: "#F76C6C" }}
            >
              Update
            </Button>
            <br />
            <Button
              onClick={deletePet}
              variant="light"
              className="mb-3"
              style={{ backgroundColor: "#F76C6C" }}
            >
              Remove Pet
            </Button>
          </Form>
        )}
      </Card>
    </section>
  );
}

export default EditPetProfilePage;
