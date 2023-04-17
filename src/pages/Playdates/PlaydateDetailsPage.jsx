import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import PlaydateLike from "../../components/PlaydateLike";
import { AuthContext } from "../../context/auth.context";
import playdateServices from "../../services/playdate.service";

function PlaydatesDetailsPage() {
  const [playdate, setPlaydate] = useState(null);
  const { playdateId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {

    playdateServices
      .getPlaydate(playdateId)
      .then((response) => {
        console.log(response.data);
        const onePlaydate = response.data;
        setPlaydate(onePlaydate);
      })
      .catch((error) => console.log(error));
  }, []);

  const canEdit = playdate && user && playdate.createdBy === user._id;

  return (
    <div className="PlaydateDetails">
      {playdate && (
        <>
          <img src={playdate.imageUrl} alt="playdate.title" width="200" />
          <h1>{playdate.title}</h1>
          <p>{playdate.location}</p>
          <p>{playdate.date}</p>
          <p>{playdate.time}</p>
          {playdate.pets && playdate.pets.map((pet) => (
            <p key={pet._id}>{pet.name}</p>
          ))}
          <p>{playdate.description}</p>
        </>
      )}

      <Link to="/api/playdates">
        <button>Back to playdates</button>
      </Link>
      
      {canEdit && (
        <Link to={`/api/playdates/${playdateId}/edit`}>
        <button>Edit Playdate</button>
      </Link>
      )}
      

      {playdate && <PlaydateLike playdate={playdate} />}
    </div>
  );
}

export default PlaydatesDetailsPage;
