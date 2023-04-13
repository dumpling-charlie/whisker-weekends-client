import { useState, useEffect } from "react";
import axios from "axios";
import PlaydateCard from "../../components/PlaydateCard";

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
    <div className="PlaydatePage">
      {playdates.map((playdate) => (
        <PlaydateCard key={playdate._id} {...playdate} />
      ))}
      <div>
        <button>
          <a href="/api/playdates/create">Add playdate</a>
        </button>
      </div>
    </div>
  );
}

export default PlaydatesPage;
