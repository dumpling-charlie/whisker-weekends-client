import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import playdateServices from "../../services/playdate.service";

function EditPlaydatePage() {
  const [playdate, setPlaydate] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
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
        setFormData({
          imageUrl: onePlaydate.imageUrl,
          title: onePlaydate.title,
          location: onePlaydate.location,
          date: onePlaydate.date,
          time: onePlaydate.time,
          pets: onePlaydate.pets,
          description: onePlaydate.description,
        });
        console.log(formData);
      })
      .catch((error) => console.log(error));
  }, [playdateId]);

  const handleFileUpload = (e) => {
    e.preventDefault();

    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    playdateServices
      .uploadImage(uploadData)
      .then((response) => {
        const imageUrl = response.data.fileUrl;
        setImageUrl(imageUrl);
        setFormData((prevFormData) => ({
          ...prevFormData, imageUrl: imageUrl
        }));
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    playdateServices
      .updatePlaydate(playdateId, formData)
      .then(() => navigate("/api/playdates"))
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
        console.log("playdate deleted!")
        navigate("/api/playdates")
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

          <input type="file" onChange={(e) => handleFileUpload(e)} />

          {/*<label>
            {" "}
            Pets:
            <select
              name="pets"
              multiple value={formData.pets}
              onChange={handlePetSelect}
            >
              {}
              <option value="">select...</option>
              {["introvert", "outgoing", "playful"].map((personality) => (
                <option key={personality} value={personality}>
                  {personality}
                </option>
              ))}
            </select>
              </label> */}

          <button type="submit" disabled={!imageUrl}>Update</button>
      </form>
      )}
      <button onClick={deletePlaydate}>Delete Playdate</button>
    </section>
  );
}

export default EditPlaydatePage;
