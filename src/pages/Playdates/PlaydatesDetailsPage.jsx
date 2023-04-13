import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


function PlaydatesDetailsPage(props) {
  const [playdate, setPlaydate] = useState(null);
  const { playdateId } = useParams();

  const getPlaydate = () => {
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
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPlaydate();
  }, []);

  return (
    <div className="ProjectDetails">
      {playdate && (
        <>
          <h1>{playdate.title}</h1>
          <p>{playdate.description}</p>
        </>
      )}

      <Link to="/playdates">
        <button>Back to playdates</button>
      </Link>

      <Link to={`/playdates/edit/${playdateId}`}>
        <button>Edit Playdate</button>
      </Link>
    </div>
  );
}

export default PlaydatesDetailsPage;
