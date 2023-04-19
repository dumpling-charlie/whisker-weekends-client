import { useState, useEffect } from "react";
import axios from "axios";
import PlaydateCard from "../../components/PlaydateCard/PlaydateCard";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Button from "react-bootstrap/Button";

function PlaydatesPage() {
  const [playdates, setPlaydates] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("authToken");
  const isAuthenticated = !!userId;

  const getAllPlaydates = () => {
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/playdates`)
      .then((response) => setPlaydates(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  };

  const renderPlaydates = () => {
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
          {isAuthenticated ? (
            <Button size="sm" variant="light">
              <Link to="/api/playdates/create">Add playdate</Link>
            </Button>) : (
              <Button size="sm" variant="light" disabled>
              <Link to="/api/playdates/create">Add playdate</Link>
            </Button>
            )
          }
          <div>
            <Link to="/api/playdates/safety">Safety</Link>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    getAllPlaydates();
  }, []);

  return (
    <>
      {!loading ? renderPlaydates() : <h1>loading <Spinner/> </h1>}
    </>
  );
  
}

export default PlaydatesPage;
