import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import playdateServices from "../../services/playdate.service";
import Spinner from "../Spinner";
import { BsCheckCircle } from "react-icons/bs";
import {Button, Card, Form, Image} from "react-bootstrap";

function EditPlaydatePage() {
  const [playdate, setPlaydate] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [newImageFile, setNewImageFile] = useState(null);

  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    location: "",
    date: "",
    time: "",
    pets: "",
    description: "",
  });
  const { playdateId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    playdateServices
      .getPlaydate(playdateId)
      .then((response) => {
        const onePlaydate = response.data;
        setPlaydate(onePlaydate);

        setImageUrl(onePlaydate.imageUrl);

        setFormData({
          title: onePlaydate.title,
          location: onePlaydate.location,
          date: new Date(onePlaydate.date).toISOString().substr(0, 10),
          time: onePlaydate.time,
          pets: onePlaydate.pets,
          description: onePlaydate.description,
        });
      })
      .catch((error) => console.log(error));
  }, [playdateId]);

  const handleFileUpload = (e) => {
    e.preventDefault();

    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);
    setUploading(true);

    playdateServices
      .uploadImage(uploadData)
      .then((response) => {
        const imageUrl = response.data.fileUrl;
        setNewImageFile(imageUrl);
        setFormData((prevFormData) => ({
          ...prevFormData,
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

    playdateServices
      .updatePlaydate(playdateId, formData)
      .then(() => navigate("/playdates"))
      .catch((err) => console.error(err));
    console.log(formData);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const deletePlaydate = () => {
    playdateServices
      .deletePlaydate(playdateId)
      .then(() => {
        console.log("playdate deleted!");
        navigate("/playdates");
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="d-flex justify-content-center">
      <Card style={{ width: "50rem", backgroundColor: "#A8D0E6", border: "2px solid #374785" }}>
      <h1>Edit Playdate Details</h1>
      {playdate && (
        <Form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>
            {" "}
            Title:
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
            />
          </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>
            {" "}
            Location:
            <Form.Control
              type="string"
              name="location"
              value={formData.location}
              onChange={handleFormChange}
            />
          </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
            {" "}
            Date:
            <Form.Control
              type="Date"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
            />
          </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
            {" "}
            Time:
            <Form.Control
              type="string"
              name="time"
              value={formData.time}
              onChange={handleFormChange}
            />
          </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
            {" "}
            Description:
            <Form.Control
              type="string"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
            />
          </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>
            {" "}
            <Image src={newImageFile || imageUrl} alt="current playdate" className="mx-auto d-block"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}/>
            <Form.Control type="file" onChange={(e) => handleFileUpload(e)} />
            {uploading && (
              <p>
                Image uploading <Spinner />
              </p>
            )}
            {newImageFile && <BsCheckCircle color="green" />}
          </Form.Label>
          </Form.Group>

          <Button variant="light" style={{ backgroundColor: "#F76C6C" }} type="submit" disabled={!imageUrl}>
            Update
          </Button>
        </Form>
      )}
      <div className="d-flex justify-content-center">
      <Button variant="light" className="Button" onClick={deletePlaydate} style={{ width: "10rem", backgroundColor: "#F76C6C" }}>Delete Playdate</Button>
      </div>
      </Card>
    </section>
  );
}

export default EditPlaydatePage;
