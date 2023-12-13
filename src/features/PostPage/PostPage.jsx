import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./PostPage.module.css";
import { ProfileDetailsInput } from "../ProfilePage/components/ProfileDetailsInput/ProfileDetailsInput";
import { Button } from "../../components/Button/Button";
import { useAuthContext } from "../Auth/AuthContext";
import { addCommentSchema } from "../RegisterPage/AuthSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from "react-toastify";

export const PostPage = () => {
    const [post, setPost] = useState(null);
    const [postUser, setPostUser] = useState(null);
    const [comments, setComments] = useState(null);
    const [likes, setLikes] = useState(null);
    const [isLiked, setIsLiked] = useState(null);
    const [updatedUser, setUpdatedUser] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(addCommentSchema),
    });

    const { user } = useAuthContext();

    useEffect(() => {
        const getData = async () => {
            const post = await fetch(`http://localhost:3000/posts/${id}`)
            .then(async (res) => {
                const data = res.json();
                return data;
            })

            setPost(post);
            setLikes(post.likes);

            const comments = post.commentsIds.map(async id => {
                const data = await fetch(`http://localhost:3000/comments/${id}`)
                .then(res => res.json())
                return data;
            }) 

            const commentsForUi = await Promise.all(comments);
            setComments(commentsForUi);

            const postUser =  await fetch(`http://localhost:3000/users/${post.userId}`)
            .then(async (res) => {
                const data = res.json();
                return data;
            })

            setPostUser(postUser);

            if (user) {
                const updatedUser = await fetch(`http://localhost:3000/users/${user.id}`)
                .then(async (res) => {
                    const data = res.json();
                    return data;
                })
            
                setIsLiked(updatedUser.likedPostsIds.includes(post.id))
                setUpdatedUser(updatedUser)
            }
        }

        getData();
    }, []);

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:3000/posts/${post.id}`, {
                method: 'DELETE',
            })
            const deleteComments = post.commentsIds.map(async id => (
                await fetch(`http://localhost:3000/comments/${id}`,{
                    method: 'DELETE',
                })
            ));
            await Promise.all(deleteComments);
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async (values) => {
        if (!user) {
            toast.error('You must log in first', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        } 

        const dataForServer = {
            text: values.comment,
            userId: user.id
        }

        const data = await fetch(
            "http://localhost:3000/comments",
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

        await fetch(
            `http://localhost:3000/posts/${post.id}`,
            {
              method: 'PATCH',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({commentsIds: [data.id, ...post.commentsIds]}),
            }
        );

        window.location.reload();
    }

    const handleLike = async () => {
        if (!user) {
            toast.error('You must log in first', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }

        if (!isLiked) {
            await fetch(
                `http://localhost:3000/users/${user.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({likedPostsIds: [post.id, ...updatedUser.likedPostsIds]}),
                }
            );
            await fetch(
                `http://localhost:3000/posts/${post.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({likes: likes + 1}),
                }
            );
            setLikes(likes + 1);
            setIsLiked(true);
        } else {
            await fetch(
                `http://localhost:3000/users/${user.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({likedPostsIds: [...updatedUser.likedPostsIds.filter(postId => postId !== post.id)]}),
                }
            );
            await fetch(
                `http://localhost:3000/posts/${post.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({likes: likes - 1}),
                }
            );
            setLikes(likes - 1);
            setIsLiked(false);
        }
    }

    return (
        <div className={styles.postPageContainer}>
            <ToastContainer />
            {post && comments && postUser &&
            <div className={styles.postContainer}>
                {user && postUser.id === user.id &&
                <div className={styles.actionButtons}>
                    <Button text="Edit" onClick={() => navigate(`/posts/edit/${id}`)} />
                    <Button text="Delete" onClick={handleDelete} />
                </div>}
                <img src={post.image} alt="Not Found" className={styles.postImage} />
                <p className={styles.postAuthor}>By {postUser.firstName} {postUser.lastName}</p>
                <p className={styles.postDescription}>{post.description}</p>
                <div>
                    <ul className={styles.postComments}>
                        <Button text={isLiked ? "Liked! " + likes : "Like " + likes} onClick={handleLike} />
                        {comments.map(comment => (
                            <li key={comment.id}>
                                <p>{comment.text}</p>
                            </li>
                        ))}
                    </ul>
                    <form className={styles.addComment} onSubmit={handleSubmit(onSubmit)}>
                        <ProfileDetailsInput
                            label="Comment"
                            type="text"
                            name="comment"
                            {...register("comment")}
                            isError={errors.comment}
                            errorMessage={errors.comment ? errors.comment.message : ""}
                        />
                        <Button text="Save" />
                    </form>
                </div>
            </div>}
            {!post && !comments && !postUser && <p>Buffering...</p>}
        </div>
    );
}