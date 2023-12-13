import { ProfileDetailsInput } from "../ProfileDetailsInput/ProfileDetailsInput";
import { useAuthContext } from "../../../Auth/AuthContext";

const labels = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    description: "Description"
}

export const ProfileDetails = () => {
    const { user } = useAuthContext();

    return (
        <form>
            {Object.keys(user).map(key => {
                if (user[key] && key !== "id" && key !== "image" && key !== "likedPostsIds") {
                    return (
                        <ProfileDetailsInput 
                            key={user[key]}
                            label={labels[key]}
                            type="text" 
                            name={user[key]}
                            value={user[key]}
                            readOnly
                            isFocused
                        />
                    );
                }
            })}
        </form>
    );
}