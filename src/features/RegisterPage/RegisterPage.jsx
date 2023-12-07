import styles from "../LoginPage/LoginPage.module.css";
import { ProfileDetailsInput } from "../ProfilePage/components/ProfileDetailsInput/ProfileDetailsInput";
import { Button } from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerSchema } from "./AuthSchema";

export const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (values) => {
        const { confirmPassword, ...dataForServer } = values;
        
        const data = await fetch(
            "http://localhost:3000/register",
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(dataForServer),
            }
        ).then(async (res) => {
            const data = res.json();
            return data;
        })

        if (!data.accessToken) {
            toast.error(data, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }

        toast.success('You have registered successfully.', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }

    return (
        <div className={styles.loginPageContainer}>
            <ToastContainer />
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    label="Password"
                    type="password"
                    name="password"
                    {...register("password")}
                    isError={errors.password}
                    errorMessage={errors.password ? errors.password.message : ""}
                />
                <ProfileDetailsInput
                    label="Confirm password"
                    type="password"
                    name="confirmPassword"
                    {...register("confirmPassword")}
                    isError={errors.confirmPassword}
                    errorMessage={errors.confirmPassword ? errors.confirmPassword.message : ""}
                />
                <Button text="Register" type="submit" />
            </form>
        </div>
    );
}