import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const [posts, setPosts] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            const data = await fetch("http://localhost:3000/posts")
            .then(async (res) => {
                const data = res.json();
                return data;
            })
            setPosts(data);
            console.log(data);
        }
        getData()
    }, []);

    return (
        <ul className={styles.postsContainer}>
            {posts && posts.map(post => (
                <li key={post.id} className={styles.postsItem} onClick={() => navigate(`/posts/${post.id}`)}>
                    <img src={post.image} alt="Not Found" className={styles.postsImage} />
                    <p>{post.description}</p>
                </li>
            ))}
            {!posts && <p>Buffering...</p>}
        </ul>
    );
}