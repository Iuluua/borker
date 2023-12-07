import './App.css';
import { LoginPage } from './features/LoginPage/LoginPage';
import { ProfilePage } from './features/ProfilePage/ProfilePage';
import { RegisterPage } from './features/RegisterPage/RegisterPage';
import brokPicture from "./images/brok_profile_image.jpg";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './features/NavBar/NavBar';
import { MobileMenu } from './features/MobileMenu/MobileMenu';
import { AuthContextProvider } from './features/Auth/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <NavBar />
        <MobileMenu>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage imageUrl={brokPicture} />} />
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </MobileMenu>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App
