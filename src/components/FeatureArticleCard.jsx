import { Link } from "react-router-dom"
import FormattedDate from "./FormattedDate"


function FeatureArticleCard({ articleImg, articleTitle, articleDate, articleAuthor, articleTopic, articleVotes, articleCommentCount, articleId }) {

    return (
        <article className="featured-article-card">
            <div className="featured-article-card-img-container">
                <p className="featured-article-card-topic"><Link to={`topics/${articleTopic}`}>{articleTopic}</Link></p>
                <h3 className="featured-article-card-title"><Link to={`articles/${articleId}`}>{articleTitle}</Link></h3>
                <Link to={`articles/${articleId}`}>
                    <img src={articleImg} />
                </Link>
                <FormattedDate timestamp={articleDate} />
            </div>
            <div className="featured-article-card-info-container">
                <p className="featured-article-card-author"><Link to={`users/${articleAuthor}`}>By {articleAuthor}</Link></p>
            </div>
            <div className="featured-article-card-details-container">
                <p className="featured-article-card-votes">Votes: {articleVotes}</p>
                <p className="featured-article-card-comments">Comments: {articleCommentCount}</p>
            </div>
        </article>
    )
}

export default FeatureArticleCard