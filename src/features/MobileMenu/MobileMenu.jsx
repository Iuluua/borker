import styles from "./MobileMenu.module.css";
import { useState } from "react";

export const MobileMenu = ({ children }) => {
    const [isMenu, setIsMenu] = useState(false);

    return (
        <>
            <div className={styles.mobileMenu} onClick={() => setIsMenu(!isMenu)}></div>
            {isMenu && 
            <div className={styles.mobileMenuContainer}>
                <a href="#">Profile Page</a>
                <a href="#">Home</a>
                <a href="#">Logout/Login</a>
            </div>}
            {!isMenu && children}
        </>
    );
}