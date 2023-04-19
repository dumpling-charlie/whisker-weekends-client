import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import playdateServices from "../../services/playdate.service";
import Spinner from "../Spinner";
import { BsCheckCircle } from "react-icons/bs";

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
    <section>
      <h1>Edit Playdate Details</h1>
      {playdate && (
        <form onSubmit={handleFormSubmit}>
          <label>
            {" "}
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
            />
          </label>

          <label>
            {" "}
            Location:
            <input
              type="string"
              name="location"
              value={formData.location}
              onChange={handleFormChange}
            />
          </label>
          <label>
            {" "}
            Date:
            <input
              type="Date"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
            />
          </label>
          <label>
            {" "}
            Time:
            <input
              type="string"
              name="time"
              value={formData.time}
              onChange={handleFormChange}
            />
          </label>
          <label>
            {" "}
            Description:
            <input
              type="string"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
            />
          </label>

          <label>
            {" "}
            Image:
            <img src={newImageFile || imageUrl} alt="current playdate" />
            <input type="file" onChange={(e) => handleFileUpload(e)} />
            {uploading && (
              <p>
                Image uploading <Spinner />
              </p>
            )}
            {newImageFile && <BsCheckCircle color="green" />}
          </label>

          {/*<label>
            {" "}
            Pets:
            <select
              name="pets"
              multiple value={formData.pets}
              onChange={handlePetSelect}
            >
            </select>
              </label> */}

          <button type="submit" disabled={!imageUrl}>
            Update
          </button>
        </form>
      )}
      <button onClick={deletePlaydate}>Delete Playdate</button>
    </section>
  );
}

export default EditPlaydatePage;
