import styles from "./MobileMenu.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const MobileMenu = ({ children }) => {
    const [isMenu, setIsMenu] = useState(false);

    return (
        <>
            <div className={styles.mobileMenu} onClick={() => setIsMenu(!isMenu)}></div>
            {isMenu && 
            <nav className={styles.mobileMenuContainer}>
                <NavLink to="profile" onClick={() => setIsMenu(false)}>Profile Page</NavLink>
                <NavLink to="login" onClick={() => setIsMenu(false)}>Login</NavLink>
                <NavLink to="register" onClick={() => setIsMenu(false)}>Register</NavLink>
            </nav>}
            {!isMenu && children}
        </>
    );
}