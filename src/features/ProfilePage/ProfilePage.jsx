import { Button } from "../../components/Button/Button";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import styles from "./ProfilePage.module.css";
import { ProfileDetails } from "./components/ProfileDetails/ProfileDetails";

export const ProfilePage = ({ name, imageUrl }) => {
    return (
        <MobileMenu>
            <div className={styles.profilePageContainer}>
                <img 
                    src={imageUrl} 
                    alt="Not Found" 
                    className={styles.profilePicture} 
                />
                <h1>{name}</h1>
                <div className={styles.profileDetails}>
                    <p>Personal Information</p>
                    <ProfileDetails />
                    <Button text="Edit" />
                </div>
            </div>
        </MobileMenu>
    );
}