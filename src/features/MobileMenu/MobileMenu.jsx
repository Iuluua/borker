import styles from "./MobileMenu.module.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";

export const MobileMenu = ({ children }) => {
    const [isMenu, setIsMenu] = useState(false);
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.mobileMenu} onClick={() => setIsMenu(!isMenu)}></div>
            {isMenu && 
            <div>
                {user && <h3 className={styles.mobileMenuGreeting}>Welcome, {user.firstName}</h3>}
                <nav className={styles.mobileMenuContainer}>
                    <NavLink to="/" onClick={() => setIsMenu(false)}>Home</NavLink>
                    {user &&
                    <> 
                        <NavLink to="profile" onClick={() => setIsMenu(false)}>Profile Page</NavLink>
                        <a               
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            logout();
                            navigate("/");
                            setIsMenu(!isMenu);
                        }}
                        >
                            Logout
                        </a>
                    </>}
                    {user === null &&
                    <>
                        <NavLink to="login" onClick={() => setIsMenu(false)}>Login</NavLink>
                        <NavLink to="register" onClick={() => setIsMenu(false)}>Register</NavLink>
                    </>}
                </nav>
            </div>}
            {!isMenu && children}
        </>
    );
}