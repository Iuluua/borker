import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import clsx from "clsx";

export const NavBar = () => {
    return (
        <nav className={styles.navBarContainer}>
            <NavLink 
                to="profilePageBrok" 
                className={({ isActive }) => isActive && styles.active}
            >
                Profile Page
            </NavLink>
            <NavLink 
                to="login" 
                className={({ isActive }) => clsx(styles.authButton, {[styles.active]: isActive})}
            >
                Login
            </NavLink>
            <NavLink 
                to="register" 
                className={({ isActive }) => isActive && styles.active}
            >
                Register
            </NavLink>
        </nav>
    );
}