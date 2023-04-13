import { Link } from "react-router-dom";

function PlaydateCard ( { _id, title, description} ) {
  
  return (
    <div className="PlaydateCard card">
      <Link to={`/api/playdates/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>The plan: {description} </p>
    </div>
  );
}

export default PlaydateCard;