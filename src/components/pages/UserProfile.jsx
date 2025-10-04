import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserByUsername, fetchArticles } from "../../api";
import ArticleCard from "../ArticleCard";

function UserProfile() {
    const { user } = useParams();

    const [userInfo, setUserInfo] = useState({});
    const [userArticles, setUserArticles] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");

        fetchUserByUsername(user)
            .then((res) => {
                setUserInfo(res);
            })
            .catch(() => {
                setError("User not found.");
            });

        fetchArticles()
            .then((articles) => {
                const authored = articles.filter((article) => article.author === user);
                setUserArticles(authored);
            })
            .catch(() => {
                setError("Couldn't load user's articles.");
            });
    }, [user]);

    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <section className="section">
                <h1>User Profile</h1>
                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
                    <img
                        src={userInfo.avatar_url}
                        alt={`${userInfo.username}'s avatar`}
                        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                    />
                    <div>
                        <p><strong>Username:</strong> {userInfo.username}</p>
                        <p><strong>Name:</strong> {userInfo.name}</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <h2>Articles by {userInfo.username}</h2>
                {userArticles.length === 0 ? (
                    <p>This user hasn't written any articles yet.</p>
                ) : (
                    userArticles.map((article) => (
                        <ArticleCard
                            key={article.article_id}
                            articleImg={article.article_img_url}
                            articleTitle={article.title}
                            articleDate={article.created_at}
                            articleAuthor={article.author}
                            articleTopic={article.topic}
                            articleVotes={article.votes}
                            articleCommentCount={article.comment_count}
                            articleId={article.article_id}
                        />
                    ))
                )}
            </section>
        </div>
    );
}

export default UserProfile;