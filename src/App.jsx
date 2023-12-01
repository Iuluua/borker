import './App.css';
import { LoginPage } from './features/LoginPage/LoginPage';
import { ProfilePage } from './features/ProfilePage/ProfilePage';
import { RegisterPage } from './features/RegisterPage/RegisterPage';
import brokPicture from "./images/brok_profile_image.jpg";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './features/NavBar/NavBar';
import { MobileMenu } from './features/MobileMenu/MobileMenu';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <MobileMenu>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profilePageBrok" element={<ProfilePage name="Brok" imageUrl={brokPicture} />} />
        </Routes>
      </MobileMenu>
    </BrowserRouter>
    // <ProfilePage name="Brok" imageUrl={brokPicture} />
    // <LoginPage />
    // <RegisterPage />
  );
}

export default App
