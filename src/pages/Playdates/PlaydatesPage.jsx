import { useState, useEffect } from "react";
import axios from "axios";
import PlaydateCard from "../../components/PlaydateCard/PlaydateCard";
import { Link } from "react-router-dom";

function PlaydatesPage() {
  const [playdates, setPlaydates] = useState([]);

  const getAllPlaydates = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/playdates`)
      .then((response) => setPlaydates(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPlaydates();
  }, []);

  return (
    <div className="row">
      {playdates.map((playdate) => (
        <div
          key={playdate._id}
          className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4"
        >
          <PlaydateCard {...playdate} />
        </div>
      ))}
      <div>
        <button>
          <Link to="/api/playdates/create">Add playdate</Link>
        </button>
        <div>
        <Link to="/api/playdates/security">Security</Link>
      </div>
      </div>
    </div>
  );
}

export default PlaydatesPage;
