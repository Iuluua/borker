import { NavLink, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import clsx from "clsx";
import { useAuthContext } from "../Auth/AuthContext";

export const NavBar = () => {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();

    return (
        <nav className={styles.navBarContainer}>
            <NavLink 
                to="/" 
                className={({ isActive }) => isActive && styles.active}
            >
                Home
            </NavLink>

            {user === null &&
            <>
                <NavLink 
                    to="login" 
                    className={({ isActive }) => clsx(styles.authButton, { [styles.active]: isActive })}
                >
                    Login
                </NavLink>
                <NavLink 
                    to="register" 
                    className={({ isActive }) => isActive && styles.active}
                >
                    Register
                </NavLink>
            </>}
            {user &&
            <>
                <p className={styles.authButton}>
                    Welcome, 
                    <NavLink 
                        to="profile" 
                        className={({ isActive }) => isActive && styles.active}
                    >
                        {user.firstName}
                    </NavLink>
                </p>
                <a               
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                        navigate("/");
                    }}
                >
                    Logout
                </a>
            </>}  
        </nav>
    );
}