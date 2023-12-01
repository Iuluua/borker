import { ProfileDetailsInput } from "../ProfileDetailsInput/ProfileDetailsInput";

export const ProfileDetails = () => {

    return (
        <form>
            <ProfileDetailsInput label="First Name" type="text" name="firstName" />
            <ProfileDetailsInput label="Last Name" type="text" name="lastName" />
            <ProfileDetailsInput label="Email" type="email" name="email" />
        </form>
    );
}