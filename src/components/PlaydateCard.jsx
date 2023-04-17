import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function PlaydateCard ( { _id, imageUrl, title, description} ) {
  
  return (
    <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
    <div className="PlaydateCard card" style={{ width: "18rem" }}>
        <img src={imageUrl} alt="playdate" width="200" />
        <h3>{title}</h3>
      
      <p style={{ maxWidth: "400px" }}>The plan: {description} </p>
      <Link to={`/api/playdates/${_id}`}><Button>More details</Button></Link>
    </div>
    </div>
  );
}

export default PlaydateCard;