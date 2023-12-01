import styles from "./LoginPage.module.css";
import { ProfileDetailsInput } from "../ProfilePage/components/ProfileDetailsInput/ProfileDetailsInput";
import { Button } from "../../components/Button/Button";
import { MobileMenu } from "../MobileMenu/MobileMenu";

export const LoginPage = () => {
    return (
        <MobileMenu>
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
        </MobileMenu>
    );
}