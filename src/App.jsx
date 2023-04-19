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
import UserProfilePage from "./pages/ProfilePage/UserProfilePage";
import PetProfilePage from "./pages/PetPages/PetProfilePage";
import PlaydatesPage from "./pages/Playdates/PlaydatesPage";
import PetList from "./pages/PetPages/PetList";
import CreatePet from "./pages/PetPages/CreatePet";
import CreatePlaydatePage from "./pages/Playdates/CreatePlaydatePage";
import PlaydateDetailsPage from "./pages/Playdates/PlaydateDetailsPage";
import EditPlaydatePage from "./pages/Playdates/EditPlaydatePage";
import EditPetProfilePage from "./pages/PetPages/EditPetProfilePage";
import MyPlaydatesPage from "./pages/Playdates/MyPlaydatesPage";
import PlaydateLike from "./components/PlaydateLike";
import PetFriendlyPlaces from "./pages/PetFriendly/PetFriendlyPlaces";
import CreatePetFriendlyPlacePage from './pages/PetFriendly/CreatePetFriendlyPlace';
import PlaydateSafetyPage from './pages/Playdates/PlaydateSafetyPage'


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile"element={<IsPrivate>{" "}<ProfilePage />{" "} </IsPrivate>}/>
        <Route path="/profile/edit"element={<IsPrivate>{" "}<EditProfile />{" "}</IsPrivate>} />
        <Route path="/signup"element={<IsAnon>{" "}<SignupPage />{" "}</IsAnon>}/>
        <Route path="/login" element={ <IsAnon>{" "} <LoginPage />{" "}</IsAnon>}/>
        <Route path="/pets/" element={<PetList />} />
        <Route path="/pets/create" element={<CreatePet />}></Route>
        <Route path="/pets/:petId" element={<PetProfilePage />} />
        <Route path="/profile/:userId" element={<UserProfilePage/>} />
        <Route path="/pets/edit/:petId" element={<EditPetProfilePage/>} />
        <Route path="/playdates" element={<PlaydatesPage />} />
        <Route path="/playdates/create" element={<CreatePlaydatePage />} />
        <Route path="/playdates/my-playdates" element={<MyPlaydatesPage />} /> 
        <Route path="/playdates/:playdateId/like" element={<PlaydateLike />} />
        <Route path="/playdates/:playdateId/edit" element={<EditPlaydatePage />} />
        <Route path="/playdates/:playdateId" element={<PlaydateDetailsPage />} />
        <Route path="/friendly" element={<PetFriendlyPlaces />} />
        <Route path="/friendly/create" element={<CreatePetFriendlyPlacePage />} />
        <Route path="/playdates/safety" element={<PlaydateSafetyPage />} />
      </Routes>

    </div>
  );
}

export default App;
