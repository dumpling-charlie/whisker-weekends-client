import { useState, useEffect } from "react";
import axios from "axios";
import PlaydateCard from "../../components/Playdates/PlaydateCard/PlaydateCard";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Button from "react-bootstrap/Button";
import "./Playdates.css"

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
      .finally(() => setLoading(false));
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
            <Link to="/playdates/create"><Button className="Button">
              Add playdate
            </Button></Link>
          ) : (
            <Link to="/playdates/create"><Button className="Button" disabled>
              Add playdate
            </Button></Link>
          )}
          <div>
            <Link to="/playdates/safety" className="link">Safety</Link>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getAllPlaydates();
  }, []);

  return (
    <>
      {!loading ? (
        renderPlaydates()
      ) : (
        <h1>
          loading <Spinner />{" "}
        </h1>
      )}
    </>
  );
}

export default PlaydatesPage;
