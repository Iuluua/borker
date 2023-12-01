import styles from "./LoginPage.module.css";
import { ProfileDetailsInput } from "../ProfilePage/components/ProfileDetailsInput/ProfileDetailsInput";
import { Button } from "../../components/Button/Button";

export const LoginPage = () => {
    return (
        <div className={styles.loginPageContainer}>
            <h1>Login</h1>
            <div>
                <ProfileDetailsInput 
                    label="Email" 
                    type="email" 
                    name="email"
                />
                <ProfileDetailsInput 
                    label="Password" 
                    type="password" 
                    name="password"
                />
                <Button text="Login" />
            </div>
        </div>
    );
}