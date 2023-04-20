import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import PlaydateCard from "./PlaydateCard/PlaydateCard";

function LikedPlaydates() {
  const [playdatesList, setPlaydatesList] = useState(null);
  const [userId, setUserId] = useState("");
  const storedToken = localStorage.getItem("authToken");

  const loadPlaydates = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/playdates/`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const likedPlaydates = response.data.filter((playdate) =>
          playdate.likedBy.includes(userId)
        );
        setPlaydatesList(likedPlaydates || []);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUserId(decodedToken._id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      loadPlaydates();
    }
  }, [userId]);

  const renderList = () => {
    return (
      <div className="row">
        {playdatesList.map((playdate) => (
          <div
            key={playdate._id}
            className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4"
          >
            <PlaydateCard {...playdate} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <h3>Liked Playdates:</h3>
      {playdatesList ? renderList() : <h2>still loading...</h2>}
    </>
  );
}

export default LikedPlaydates;
