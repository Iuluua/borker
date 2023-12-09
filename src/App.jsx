import './App.css';
import { LoginPage } from './features/LoginPage/LoginPage';
import { ProfilePage } from './features/ProfilePage/ProfilePage';
import { RegisterPage } from './features/RegisterPage/RegisterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './features/NavBar/NavBar';
import { MobileMenu } from './features/MobileMenu/MobileMenu';
import { AuthContextProvider } from './features/Auth/AuthContext';
import { EditProfilePage } from './features/EditProfilePage/EditProfilePage';
import { HomePage } from './features/HomePage/HomePage';
import { PostPage } from "./features/PostPage/PostPage";
import { AddPostPage } from './features/AddPostPage/AddPostPage';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <NavBar />
        <MobileMenu>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/edit" element={<EditProfilePage />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="addPost" element={<AddPostPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </MobileMenu>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App
