import styles from "./AddPostPage.module.css";
import { ProfileDetailsInput } from "../ProfilePage/components/ProfileDetailsInput/ProfileDetailsInput";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from "../../components/Button/Button";
import { addSchema } from "../RegisterPage/AuthSchema";
import { useAuthContext } from "../Auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AddPostPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(addSchema),
    });

    const { user } = useAuthContext();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const dataForServer = {
            image: URL.createObjectURL(values.image[0]),
            description: values.description,
            likes: 0,
            commentsIds: [],
            userId: user.id
        }

        try {
            const data = await fetch(
                "http://localhost:3000/posts",
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
            toast.success('Post added succesfully', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setTimeout(() => navigate("/"), 2000);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.addPostContainer}>
            <ToastContainer />
            <form className={styles.addPostForm} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={styles.addPostTitle}>Add Post</h1>
                <ProfileDetailsInput 
                    className={styles.profileImageInput}
                    label="Add Image"
                    type="file"
                    name="image"
                    isFocused
                    {...register("image")}
                />
                <ProfileDetailsInput
                    label="Description"
                    type="text"
                    name="description"
                    {...register("description")}
                    isError={errors.description}
                    errorMessage={errors.description ? errors.description.message : ""}
                />
                <Button text="Save" />
            </form>
        </div>
    );
}