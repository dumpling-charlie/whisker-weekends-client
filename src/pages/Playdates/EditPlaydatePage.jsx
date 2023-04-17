import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditPlaydatePage() {
  const [playdate, setPlaydate] = useState(null);
  const [formData, setFormData] = useState({
    // imageUrl: "",
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
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`http://localhost:5005/api/playdates/${playdateId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const onePlaydate = response.data;
        setPlaydate(onePlaydate);
        setFormData({
          // imageUrl: onePlaydate.imageUrl,
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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const storedToken = localStorage.getItem("authToken");

axios
  .put(`http://localhost:5005/api/playdates/${playdateId}/edit`, formData, {
    headers: { Authorization: `Bearer ${storedToken}` },
  })

  .then(() => navigate("/api/playdates"))
  .catch((err) => console.error(err));
    console.log(formData);
  };

  const handleFormChange = (event) => {
    const { title, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [title]: value }));
  };

  const deletePlaydate = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`http://localhost:5005/api/playdates/${playdateId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => navigate("/api/playdates"))
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
              name="name"
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

          {/* <label>
            {" "}
            Pets:
            <select
              name="personality"
              value={formData.personality}
              onChange={handleFormChange}
            >
              <option value="">select...</option>
              {["introvert", "outgoing", "playful"].map((personality) => (
                <option key={personality} value={personality}>
                  {personality}
                </option>
              ))}
            </select>
          </label> */}

          {/* <label>
            {" "}
            Image Url:
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleFormChange}
            />
          </label> */}

          <button type="submit">Update</button>
      <button onClick={deletePlaydate}>Delete Playdate</button>
      </form>
      )}
    </section>
  );
}

export default EditPlaydatePage;
