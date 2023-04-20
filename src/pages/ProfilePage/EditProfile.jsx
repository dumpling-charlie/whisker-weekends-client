import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { BsCheckCircle } from "react-icons/bs";

function EditProfile(props) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    setIsLoading(true);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setImageUrl(response.data.fileUrl);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!imageUrl) {
      setErrorMessage("You need to select a profile image!");
    } else if (!isLoading) {
      axios
        .put(`${process.env.REACT_APP_SERVER_URL}/api/profile/${user._id}`, imageUrl, { headers: {Authorization: `Bearer ${storedToken}`}})
        .then((response) => {
          navigate("/profile");
          //props.callbackToUpdateUser();
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
        });
    } else {
      setErrorMessage("The image is loading. Please wait and try again!");
    }
  };

  return (
    <div>
      <h2>Edit your account</h2>
      <form onSubmit={handleFormSubmit}>

        <input type="file" onChange={(e) => handleFileUpload(e)} />
            {isLoading && <p>Image uploading <Spinner/></p>}
            {imageUrl && <BsCheckCircle color='green'/>} 
      
        {/* <label> Location:
          <input type="text" name="location" value={updatedUser.location } onChange={(event)=>{changeHandler(event.target)}}></input>
        </label> */}

        <button type="submit">Update Profile</button>
      </form>
      <button>Delete Profile</button>
    </div>
  );
}

export default EditProfile;
