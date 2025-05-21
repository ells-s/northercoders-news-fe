import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { fetchArticleById } from "../../api"
import CommentSection from "../CommentSection"
import FormattedDate from "../FormattedDate"
import ArticleVotingOption from "../ArticleVotingOption"

function Article({ username }) {
    const { article_id } = useParams()
    const [currentArticle, setCurrentArticle] = useState({})

    useEffect(() => {
        fetchArticleById(article_id)
            .then((res) => {
                setCurrentArticle(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <article className="indiviual-article">
            <section className="indiviual-article-header">
                <h1>{currentArticle.title}</h1>
                <img src={currentArticle.article_img_url}></img>
            </section>
            <section className="indiviual-article-info-section">
                <div>
                    <p className="individual-article-author"> <strong>By</strong> <Link to={`../users/${currentArticle.author}`}>{currentArticle.author}</Link></p>
                    <p><Link to={`../topics/${currentArticle.topic}`}>{currentArticle.topic}</Link></p>
                    <FormattedDate timestamp={currentArticle.created_at} />
                </div>
                <div>
                    <ArticleVotingOption username={username} article_id={article_id} />

                    <p><strong>Comments:</strong> {currentArticle.comment_count}</p>
                </div>
            </section>
            <section className="article-body-section">
                <p>{currentArticle.body}</p>
            </section>
            <CommentSection article_id={article_id} />
        </article>
    )
}

export default Article