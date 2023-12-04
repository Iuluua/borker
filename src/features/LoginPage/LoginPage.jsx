import styles from "./LoginPage.module.css";
import { ProfileDetailsInput } from "../ProfilePage/components/ProfileDetailsInput/ProfileDetailsInput";
import { Button } from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSchema } from "../RegisterPage/AuthSchema";

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (values) => {
        const data = await fetch(
            "http://localhost:3000/login",
            {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify(values),
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
      
        toast.success('You have logged in successfully.', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }

    return (
        <div className={styles.loginPageContainer}>
            <ToastContainer />
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <Button text="Login" type="submit" />
            </form>
        </div>
    );
}