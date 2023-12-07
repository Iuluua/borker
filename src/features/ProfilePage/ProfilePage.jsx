import { Button } from "../../components/Button/Button";
import { useAuthContext } from "../Auth/AuthContext";
import styles from "./ProfilePage.module.css";
import { ProfileDetails } from "./components/ProfileDetails/ProfileDetails";

export const ProfilePage = ({ imageUrl }) => {
    const { user } = useAuthContext();

    return (
        <div className={styles.profilePageContainer}>
            <img 
                src={imageUrl} 
                alt="Not Found" 
                className={styles.profilePicture} 
            />
            <h1>{user.firstName}</h1>
            <div className={styles.profileDetails}>
                <p>Personal Information</p>
                <ProfileDetails />
                <Button text="Edit" />
            </div>
        </div>
    );
}