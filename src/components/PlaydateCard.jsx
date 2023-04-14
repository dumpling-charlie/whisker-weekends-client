import { Link } from "react-router-dom";

function PlaydateCard ( { _id, imageUrl, title, description} ) {
  
  return (
    <div className="PlaydateCard card">
      <Link to={`/api/playdates/${_id}`}>
        <img src={imageUrl} alt="playdate" width="200" />
        <h3>{title}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>The plan: {description} </p>
    </div>
  );
}

export default PlaydateCard;