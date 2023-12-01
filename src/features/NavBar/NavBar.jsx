import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export const NavBar = () => {
    return (
        <nav className={styles.navBarContainer}>
            <NavLink to="profilePageBrok">Profile Page</NavLink>
            <NavLink to="login" className={styles.authButton}>Login</NavLink>
            <NavLink to="register">Register</NavLink>
        </nav>
    );
}