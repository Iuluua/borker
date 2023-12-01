import styles from "./NavBar.module.css";

export const NavBar = () => {
    return (
        <div className={styles.navBarContainer}>
            <a href="#">Profile Page</a>
            <a href="#">Home</a>
            <a href="#" className={styles.authButton}>Logout/Login</a>
        </div>
    );
}