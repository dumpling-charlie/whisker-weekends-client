import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import EditProfile from "./pages/ProfilePage/EditProfile";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import IsCreator from "./components/IsCreator/IsCreator";
import PetProfilePage from "./pages/PetPages/PetProfilePage";
import PlaydatesPage from "./pages/Playdates/PlaydatesPage";
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
        <Route path="/pets/:petId" element={<PetProfilePage />} />
        <Route path="/api/playdates" element={<PlaydatesPage />} />
        <Route path="/api/playdates/create" element={<CreatePlaydatePage />} />
        <Route path="/api/playdates/:playdateId" element={<PlaydateDetailsPage />} />
        <Route path="/api/playdates/:playdateId/edit" element={<EditPlaydatePage />} />
      </Routes>
    </div>
  );
}

export default App;
