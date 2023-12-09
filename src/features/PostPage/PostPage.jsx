import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PostPage.module.css";
import { ProfileDetailsInput } from "../ProfilePage/components/ProfileDetailsInput/ProfileDetailsInput";
import { Button } from "../../components/Button/Button";
import { useAuthContext } from "../Auth/AuthContext";

export const PostPage = () => {
    const [post, setPost] = useState(null);
    const [postUser, setPostUser] = useState(null);
    const [comments, setComments] = useState(null);
    const { id } = useParams();

    const { user } = useAuthContext();

    useEffect(() => {
        const getData = async () => {
            const post = await fetch(`http://localhost:3000/posts/${id}`)
            .then(async (res) => {
                const data = res.json();
                return data;
            })

            setPost(post);

            const comments = post.commentsIds.map(async id => {
                const data = await fetch(`http://localhost:3000/comments/${id}`)
                .then(res => res.json())
                return data;
            }) 

            const commentsForUi = await Promise.all(comments);
            setComments(commentsForUi);

            const user =  await fetch(`http://localhost:3000/users/${post.userId}`)
            .then(async (res) => {
                const data = res.json();
                return data;
            })

            setPostUser(user);
        }
        getData();
    }, []);

    return (
        <div className={styles.postPageContainer}>
            {post && comments && postUser &&
            <div className={styles.postContainer}>
                {user && postUser.id === user.id &&
                <div className={styles.actionButtons}>
                    <Button text="Edit" />
                    <Button text="Delete" />
                </div>}
                <img src={post.image} alt="Not Found" className={styles.postImage} />
                <p className={styles.postAuthor}>By {postUser.firstName} {postUser.lastName}</p>
                <p className={styles.postDescription}>{post.description}</p>
                <div>
                    <ul className={styles.postComments}>
                        {comments.map(comment => (
                            <li key={comment.id}>
                                <p>{comment.text}</p>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.addComment}>
                        <ProfileDetailsInput
                            label="Comment"
                            type="text"
                        />
                        <Button text="Save" />
                    </div>
                </div>
            </div>}
            {!post && !comments && !postUser && <p>Buffering...</p>}
        </div>
    );
}