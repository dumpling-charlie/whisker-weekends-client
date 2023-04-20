import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import PlaydateLike from "../../components/Playdates/PlaydateLike";
import { AuthContext } from "../../context/auth.context";
import playdateServices from "../../services/playdate.service";
import { Button, Image, Card } from "react-bootstrap";

function PlaydatesDetailsPage() {
  const [playdate, setPlaydate] = useState(null);
  const { playdateId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    playdateServices
      .getPlaydate(playdateId)
      .then((response) => {
        const onePlaydate = response.data;
        setPlaydate(onePlaydate);
      })
      .catch((error) => console.log(error));
  }, []);

  const canEdit = playdate && user && playdate.createdBy._id === user._id;

  return (
    <div className="PlaydateDetails d-flex justify-content-center">
      <Card style={{ width: "40rem", border: "2px solid #374785" }}>
        {playdate && (
          <>
            <Card.Img
              src={playdate.imageUrl}
              alt="playdate.title"
              style={{
                objectFit: "cover",
                aspectRatio: "1/1",
                height: "20rem",
              }}
            />
            <h1>{playdate.title}</h1>
            <p>
              Host:{" "}
              <Link to={`/profile/${playdate.createdBy._id}`}>
                {playdate.createdBy.name}
              </Link>
            </p>
            <p>
              Accompanied By:
              {playdate.pets &&
                playdate.pets.map((pet) => (
                  <Link key={pet._id} to={`/pets/${pet._id}`}>
                    {" "}
                    {pet.name}
                  </Link>
                ))}
            </p>
            <p>Where? {playdate.location}</p>
            <p>
              When? {playdate.date} at {playdate.time}
            </p>

            <p>Details: <br/> {playdate.description}</p>
          </>
        )}

        <Link to="/playdates">
          <Button variant="light">Back to playdates</Button>
        </Link>

        {canEdit && (
          <Link to={`/playdates/${playdateId}/edit`}>
            <Button variant="light">Edit Playdate</Button>
          </Link>
        )}

        {playdate && <PlaydateLike playdate={playdate} />}
      </Card>
    </div>
  );
}

export default PlaydatesDetailsPage;
