import { ProfileDetailsInput } from "../ProfileDetailsInput/ProfileDetailsInput";
import { useAuthContext } from "../../../Auth/AuthContext";

export const ProfileDetails = () => {
    const { user } = useAuthContext();

    return (
        <form>
            <ProfileDetailsInput 
                label="First Name" 
                type="text" 
                name="firstName"
                value={user.firstName}
                readOnly
                isFocused
             />
            <ProfileDetailsInput 
                label="Last Name" 
                type="text" 
                name="lastName" 
                value={user.lastName}
                readOnly
                isFocused
            />
            <ProfileDetailsInput 
                label="Email" 
                type="email" 
                name="email"
                value={user.email}
                readOnly
                isFocused
            />
        </form>
    );
}