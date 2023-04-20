// display all of the playdates that the logged in user created
import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import PlaydateCard from "./PlaydateCard/PlaydateCard";

function CreatedPlaydates() {
  const [playdatesList, setPlaydatesList] = useState(null);
  const [userId, setUserId] = useState('');
  const storedToken = localStorage.getItem("authToken");

  const loadPlaydates = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/playdates`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const createdPlaydates = response.data.filter(
          (playdate) => playdate.createdBy._id === userId
        );
        setPlaydatesList(createdPlaydates);
      })
      .catch((err) => console.log(err));
  };

  const renderList = () => {
    return (
      <div className="row">
        <h3>These are the playdates you've created!</h3>
        {playdatesList.map((playdate, index) => (
          <div
            key={index}
            className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4"
          >
            <PlaydateCard {...playdate} />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUserId(decodedToken._id);
    }
  }, [storedToken]);

  useEffect(() => {
    if (userId !== null) {
      loadPlaydates();
    }
  }, []);

  return <>{playdatesList ? renderList() : <h2>still loading...</h2>}</>;
}

export default CreatedPlaydates;
