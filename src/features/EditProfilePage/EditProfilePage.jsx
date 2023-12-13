import styles from "./EditProfilePage.module.css";
import { ProfileDetailsInput } from "../ProfilePage/components/ProfileDetailsInput/ProfileDetailsInput";
import { Button } from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../Auth/AuthContext";
import { yupResolver } from '@hookform/resolvers/yup';
import { editSchema } from "../RegisterPage/AuthSchema";
import { useNavigate } from "react-router-dom";

export const EditProfilePage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(editSchema),
    });

    const { user, logout, login } = useAuthContext();

    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { image, ...valuesWithoutImage } = values;
        const dataForServer = {image: URL.createObjectURL(image[0]), ...valuesWithoutImage};
        const data = await fetch(
            `http://localhost:3000/users/${user.id}`,
            {
              method: 'PATCH',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify(dataForServer),
            }
        ).then(async (res) => {
            const data = res.json();
            return data;
        })
        console.log(data);
        logout();
        // login(data);
        // navigate("/profile")
        navigate("/login");
    }

    return (
        <div className={styles.editContainer}>
            <h1>Edit</h1>
            <p>Personal Information</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.editFormContainer}>
                <ProfileDetailsInput
                    label="First Name"
                    type="text"
                    name="firstName"
                    {...register("firstName")}
                    isError={errors.firstName}
                    errorMessage={errors.firstName ? errors.firstName.message : ""}
                />
                <ProfileDetailsInput 
                    label="Last Name"
                    type="text"
                    name="lastName"
                    {...register("lastName")}
                    isError={errors.lastName}
                    errorMessage={errors.lastName ? errors.lastName.message : ""}
                />
                <ProfileDetailsInput 
                    label="Email"
                    type="email"
                    name="email"
                    {...register("email")}
                    isError={errors.email}
                    errorMessage={errors.email ? errors.email.message : ""}
                />
                <ProfileDetailsInput
                    label="Description"
                    type="text"
                    name="description"
                    {...register("description")}
                    isError={errors.description}
                    errorMessage={errors.description ? errors.description.message : ""}
                />
                <ProfileDetailsInput 
                    className={styles.profileImageInput}
                    label="Profile Image"
                    type="file"
                    name="image"
                    isFocused
                    {...register("image")}
                />
                <Button type="submit" text="Save" />
            </form>
        </div>
    );
}