import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditPlaydatePage(props) {
  const [playdate, setPlaydate] = useState(null);
  const [formData, setFormData] = useState({});
  const { playdateId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/playdates/${playdateId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const onePlaydate = response.data;
        setPlaydate(onePlaydate);
        setFormData({
          title: onePlaydate.title,
          description: onePlaydate.description,
          date: onePlaydate.date,
          time: onePlaydate.time,
          location: onePlaydate.location,
        });
      })
      .catch((error) => console.log(error));
  }, [playdateId]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

axios
  .put(
    `${process.env.REACT_APP_SERVER_URL}/api/playdates/${playdateId}`,
    formData,
    {
      headers: { Authorization: `Bearer ${storedToken}` },
    }
  )
  .then((response) => {
    navigate(`/api/playdates/`);
  })
  .catch((error) => console.log(error));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

    const deletePlaydate = () => {
      const storedToken = localStorage.getItem("authToken");

      axios
        .delete(
          `${process.env.REACT_APP_SERVER_URL}/api/playdates/${playdateId}`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        )
        .then(() => navigate("/api/playdates"))
        .catch((err) => console.log(err));
    };  


  return (
    <div className="EditPlaydatePage">
      <h1>Edit Playdate</h1>
      {playdate && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
            />
          </label>

          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
            />
          </label>

          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
            />
          </label>

          <label>
            Time:
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleFormChange}
            />
          </label>

          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleFormChange}
            />
          </label>

          <button type="submit">Save</button>
          <button type="button" onClick={deletePlaydate}>
            Delete
          </button>
        </form>
      )}
    </div>
  );
}

export default EditPlaydatePage;
