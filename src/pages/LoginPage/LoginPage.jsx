import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { Button, Form, Card } from "react-bootstrap";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: "40rem", backgroundColor: "#A8D0E6", border: "2px solid #374785" }}>
        <h1 className="mt-3" style={{ color: '#374785' }}>Login</h1>

        <Form onSubmit={handleLoginSubmit} className="mt-3">
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
          <Button variant="light" type="submit" style={{ backgroundColor: '#F76C6C' }}>
            Login
          </Button>
        </Form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
    <div className="mt-3 mb-3">
        <p>Don't have an account yet?</p>
        <Link to={"/signup"}> Sign Up</Link>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
