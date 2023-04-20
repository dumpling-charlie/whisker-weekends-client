import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { BsCheckCircle } from "react-icons/bs";
import Button from "react-bootstrap/Button";

function EditProfile(props) {
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null);

  const [formData, setFormData] = useState({
    location: '',
    bio: '',
    imageUrl: ''
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
          bio: userInfo.bio
        });
      })
      .catch((error) => console.log(error));
  }

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
        console.log("Error while uploading the file: ", err)
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
      .put(`${process.env.REACT_APP_SERVER_URL}/api/profile/${user._id}`, formData, { headers: {Authorization: `Bearer ${storedToken}`}})
      .then(() => { navigate("/profile") })
      .catch((err) => console.error(err));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
  };

  useEffect(() => {
    fetchData();
  }, [user._id])

  return (
    <div>
      <h2>Edit your account</h2>
      <form onSubmit={handleFormSubmit}>
        <label className="mb-3">
          {" "}
          Image:
          <img
            src={newImageFile || imageUrl}
            alt="current profile photo"
            className="img-fluid mx-auto"
            Style="max-width: 150px; max-height: 150px"
          />
          <input type="file" onChange={(e) => handleFileUpload(e)} />
          {isLoading && (
            <p>
              Image uploading <Spinner />
            </p>
          )}
          {newImageFile && <BsCheckCircle color="green" />}
        </label>
        <br />
        <label className="mb-3">
          {" "}
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleFormChange}
          ></input>
        </label>
        <br />
        <label className="mb-3">
          {" "}
          Bio:
          <input
            type="textarea"
            name="bio"
            value={formData.bio}
            onChange={handleFormChange}
          ></input>
        </label>
        <br />
        <Button variant="light" type="submit" className="mb-3">
          Update Profile
        </Button>
      </form>
      <Button variant="light" className="mb-3">
        Delete Profile
      </Button>
    </div>
  );
}

export default EditProfile;
