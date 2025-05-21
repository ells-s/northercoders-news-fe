import { Link } from "react-router-dom"
import FormattedDate from "./FormattedDate"


function ArticleCard({ articleImg, articleTitle, articleDate, articleAuthor, articleTopic, articleVotes, articleCommentCount, articleId }) {

    return (
        <article className="article-card">
            <div className="article-card-img-container">
                <Link to={`${articleId}`}>
                    <img src={articleImg} />
                </Link>
            </div>
            <div className="article-card-info-container">
                <FormattedDate timestamp={articleDate} />
                <Link to={`${articleId}`}>
                    <h3 className="article-card-title">{articleTitle}</h3>
                </Link>
                <Link to={`../users/${articleAuthor}`}>
                    <p className="article-card-author">By {articleAuthor}</p>
                </Link>
                <Link to={`../topics/${articleTopic}`}>
                    <p className="article-card-topic">{articleTopic}</p>
                </Link>
            </div>
            <div className="article-card-details-container">
                <p className="article-card-votes">Votes: {articleVotes}</p>
                <p className="article-card-comments">Comments: {articleCommentCount}</p>
            </div>
        </article>
    )
}

export default ArticleCard