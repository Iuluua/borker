import './App.css';
import { LoginPage } from './features/LoginPage/LoginPage';
import { ProfilePage } from './features/ProfilePage/ProfilePage';
import { RegisterPage } from './features/RegisterPage/RegisterPage';
import brokPicture from "./images/brok_profile_image.jpg";

function App() {
  return (
    <ProfilePage name="Brok" imageUrl={brokPicture} />
    // <LoginPage />
    // <RegisterPage />
  );
}

export default App
