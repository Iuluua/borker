import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { useAuthContext } from "../Auth/AuthContext";
import styles from "./ProfilePage.module.css";
import { ProfileDetails } from "./components/ProfileDetails/ProfileDetails";

export const ProfilePage = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    return (
        <>
            {user &&
            <div className={styles.profilePageContainer}>
                <img 
                    src={user.image} 
                    alt="Not Found" 
                    className={styles.profilePicture} 
                />
                <h1>{user.firstName}</h1>
                <Button text="Add Post" onClick={() => navigate("/addPost")} />
                <div className={styles.profileDetails}>
                    <p>Personal Information</p>
                    <ProfileDetails />
                    <Button text="Edit" onClick={() => navigate("/profile/edit")} />
                </div>
            </div>}
            {!user && <h1>Buffering...</h1>}
        </>
    );
}