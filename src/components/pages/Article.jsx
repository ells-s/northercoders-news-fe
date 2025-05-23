import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { fetchArticleById } from "../../api"
import CommentSection from "../CommentSection"
import FormattedDate from "../FormattedDate"
import ArticleVotingOption from "../ArticleVotingOption"



function Article({ username }) {
    const { article_id } = useParams()
    const [currentArticle, setCurrentArticle] = useState({})
    const [articleIdRangeError, setArticleIdRangeError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)


    useEffect(() => {
        fetchArticleById(article_id)
            .then((res) => {
                setArticleIdRangeError(false)
                setErrorMessage(false)
                setCurrentArticle(res)
            })
            .catch((err) => {
                if (err.response && err.status === 404) {
                    setArticleIdRangeError(true)
                }
                else {
                    setErrorMessage(true)
                }
            })
    }, [])

    if (articleIdRangeError) {
        return <Navigate to="../not-found" />
    }


    return (
        <>
            {
                errorMessage ?

                    <p>An error occured trying to get this article.</p>

                    :
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
                        <CommentSection article_id={article_id} username={username} />
                    </article>
            }

        </>

    )

}

export default Article