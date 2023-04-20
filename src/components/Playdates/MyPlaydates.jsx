import CreatedPlaydates from "./CreatedPlaydates";
import LikedPlaydates from "./LikedPlaydates";
import '../../pages/Playdates/Playdates.css'

function MyPlaydatesPage() {
  return (
    <>
      <h1>My Playdates</h1>
      <CreatedPlaydates className="playdate-db" />

      <LikedPlaydates className="playdate-db" />
    </>
  );
}

export default MyPlaydatesPage;
