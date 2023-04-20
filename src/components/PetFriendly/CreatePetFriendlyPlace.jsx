import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";


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
    <div className="d-flex justify-content-center">
      <Card style={{ width: '40rem', backgroundColor: '#A8D0E6' }}>
      <h3 className="mt-3" style={{ color: '#374785' }}>Add a pet friendly place</h3>
      <Form onSubmit={handleSubmit} className='mb-3'>
      <Form.Group>
          <Form.Label>
          Name
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </Form.Label>
        </Form.Group>
          

        <Form.Group>
          <Form.Label>
          Details
          <Form.Control
          as="textarea"
          rows={5}
            name="details"
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
            }}
            placeholder="what makes this place amazing?"
            required
          />
        </Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>
          Location
          <Form.Control
            type="text"
            name="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            required
          />
        </Form.Label>
        </Form.Group>

        <Button variant="light" type="submit" style={{ backgroundColor: '#F76C6C' }}>
          Create
        </Button>
      </Form>
      </Card>
    </div>
  );
}

export default CreatePetFriendlyPlacePage;
