import styles from "../LoginPage/LoginPage.module.css";
import { ProfileDetailsInput } from "../ProfilePage/components/ProfileDetailsInput/ProfileDetailsInput";
import { Button } from "../../components/Button/Button";
import { MobileMenu } from "../MobileMenu/MobileMenu";

export const RegisterPage = () => {
    return (
        <MobileMenu>
            <div className={styles.loginPageContainer}>
                <h1>Register</h1>
                <div>
                    <ProfileDetailsInput 
                        label="First Name" 
                        type="text" 
                        name="firstName"
                    />
                    <ProfileDetailsInput 
                        label="Last Name" 
                        type="text" 
                        name="lastName"
                    />
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
                    <ProfileDetailsInput 
                        label="Confirm password" 
                        type="password" 
                        name="confirmPassword"
                    />
                    <Button text="Register" />
                </div>
            </div>
        </MobileMenu>
    );
}