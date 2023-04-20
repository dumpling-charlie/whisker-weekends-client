import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { Button, Card, Form } from "react-bootstrap";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);
  const handleBio = (e) => setBio(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = {
      email,
      password,
      name,
      location,
      bio
    };

    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: "40rem", backgroundColor: "#A8D0E6" }}>
        <h1 className="mt-3" style={{ color: '#374785' }}>Sign Up</h1>

        <Form onSubmit={handleSignupSubmit} className="mt-3">
          <Form.Group>
            <Form.Label>
              Email:
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
              />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Password:
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Name:
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                placeholder="other users will see this"
              />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Location:
              <Form.Control
                type="text"
                name="location"
                value={location}
                onChange={handleLocation}
                placeholder="where are you located?"
              />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Bio:
              <Form.Control
                as="textarea"
                rows={2}
                name="bio"
                value={bio}
                onChange={handleBio}
                placeholder="tell us about yourself!"
              />
            </Form.Label>
          </Form.Group>

          <Button variant="light" type="submit" style={{ backgroundColor: '#F76C6C' }}>
            submit
          </Button>
        </Form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="mt-3 mb-3">
        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
        </div>
      </Card>
    </div>
  );
}

export default SignupPage;
