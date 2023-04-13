import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import EditProfile from "./pages/ProfilePage/EditProfile";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import PetProfilePage from "./pages/PetPages/PetProfilePage";
import PlaydatesPage from "./pages/Playdates/PlaydatesPage";
import PetList from "./pages/PetPages/PetList";
import CreatePlaydatePage from "./pages/Playdates/CreatePlaydatePage";
import PlaydateDetailsPage from "./pages/Playdates/PlaydateDetailsPage";
import EditPlaydatePage from "./pages/Playdates/EditPlaydatePage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              {" "}
              <ProfilePage />{" "}
            </IsPrivate>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <IsPrivate>
              {" "}
              <EditProfile />{" "}
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignupPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {" "}
              <LoginPage />{" "}
            </IsAnon>
          }
        />
        <Route path="/api/pets/" element={<PetList />} />
        <Route path="/pets/:petId" element={<PetProfilePage />} />
        <Route
          path="/api/playdates"
          element={
            <IsAnon>
              {" "}
              <PlaydatesPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/api/playdates/create"
          element=<IsPrivate>
            {" "}
            <CreatePlaydatePage />{" "}
          </IsPrivate>
        />
        <Route
          path="/api/playdates/:playdateId"
          element=<IsPrivate>
            {" "}
            <PlaydateDetailsPage />{" "}
          </IsPrivate>
        />
        <Route
          path="/api/playdates/:playdateId/edit"
          element=<IsPrivate>
            {" "}
            <EditPlaydatePage />{" "}
          </IsPrivate>
        />
      </Routes>
    </div>
  );
}

export default App;
