import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


function PlaydatesDetailsPage(props) {
  const [playdate, setPlaydate] = useState(null);
  const { playdateId } = useParams();

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
      })
      .catch((error) => console.log(error));
  });


  return (
    <div className="PlaydateDetails">
      {playdate && (
        <>
          <h1>{playdate.title}</h1>
          <p>{playdate.location}</p>
          <p>{playdate.date}</p>
          <p>{playdate.time}</p>
          <p>{playdate.pets}</p>
          <p>{playdate.description}</p>
        </>
      )}

      <Link to="/api/playdates">
        <button>Back to playdates</button>
      </Link>

      <Link to={`/api/playdates/${playdateId}/edit`}>
        <button>Edit Playdate</button>
      </Link>
    </div>
  );
}

export default PlaydatesDetailsPage;