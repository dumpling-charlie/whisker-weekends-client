import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { BsCheckCircle } from "react-icons/bs";
import "./EditProfile.css";
import {Card, Image, Button, Form} from 'react-bootstrap';

function EditProfile(props) {
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null);

  const [formData, setFormData] = useState({
    location: "",
    bio: "",
    imageUrl: "",
  });

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/profile/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const userInfo = response.data;
        setImageUrl(userInfo.imageUrl);
        setFormData({
          location: userInfo.location,
          bio: userInfo.bio,
        });
      })
      .catch((error) => console.log(error));
  };

  const handleFileUpload = (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    setIsLoading(true);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const imageFile = response.data.fileUrl;
        setNewImageFile(imageFile);
        setFormData((prevState) => ({
          ...prevState,
          imageUrl: imageFile,
        }));
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const uploadData = new FormData();

    if (newImageFile) {
      uploadData.append("imageUrl", newImageFile);
    } else {
      uploadData.append("imageUrl", imageUrl);
    }

    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/api/profile/${user._id}`,
        formData,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => console.error(err));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    fetchData();
  }, [user._id]);

  return (
    <div className="d-flex justify-content-center">
    <Card style={{ width: '40rem', backgroundColor: '#A8D0E6', border: "2px solid #374785" }}>
      <h2 className="mt-3">Edit Account Details</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mt-3">
          <Form.Label>
            {" "}
            <Image
              src={newImageFile || imageUrl}
              alt="current profile photo"
              className="mx-auto d-block rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <div className="input-group mt-3">
              <div className="custom-file">
                <input
                  type="file"
                  className="btn btn-light"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={(e) => handleFileUpload(e)}
                />
                
              </div>
            </div>
            {isLoading && (
              <p>
                Image uploading <Spinner />
              </p>
            )}
            {newImageFile && <BsCheckCircle color="green" />}
          </Form.Label>
        </Form.Group>

        <br />

        <Form.Group>
          <Form.Label>
            {" "}
            Location:
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleFormChange}
            ></Form.Control>
          </Form.Label>
        </Form.Group>

        <br />
        <Form.Group className="mb-3">
          <Form.Label>
            {" "}
            Bio:
            <Form.Control
              as="textarea"
              rows={2}
              maxLength={100}
              name="bio"
              value={formData.bio}
              onChange={handleFormChange}
            ></Form.Control>
          </Form.Label>
        </Form.Group>
        <br />
        <Button variant="light" type="submit" className="mb-3" style={{ backgroundColor: '#F76C6C' }}>
          Update Profile
        </Button>
      </Form>
    </Card>
    </div>
  );
}

export default EditProfile;
