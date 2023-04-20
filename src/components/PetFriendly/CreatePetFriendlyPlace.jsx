import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";


function CreatePetFriendlyPlacePage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/friendly`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, [storedToken]);

  // ********  this method submits the form ********
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/friendly/create`, {
        name,
        location,
        details,
      },{
        headers: { Authorization: `Bearer ${storedToken}` },
      }
      )
      .then((res) => {
        navigate("/friendly");
      })
      .catch((err) => console.log("Error while adding the new place: ", err));
  };

  return (
    <div>
      <h1>Add a pet friendly place</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="details">Details</label>
          <textarea
            name="details"
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            required
          />
        </div>

        <Button variant="light" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreatePetFriendlyPlacePage;
