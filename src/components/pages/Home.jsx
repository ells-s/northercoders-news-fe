import { useState, useEffect } from "react"
import FeatureArticleCard from "../FeatureArticleCard"
import { fetchArticles, fetchTopics } from "../../api"
import HomeArticleCard from "../HomeArticleCard"
import { Link } from "react-router-dom"

function Home() {
    const [featureArticle, setFeatureArticle] = useState({})
    const [subFeatureArticles, setSubFeatureArticles] = useState([])
    const [mostVotedArticles, setMostVotedArticles] = useState([])
    const [topics, setTopics] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        setErrorMessage("")
        fetchArticles()
            .then((res) => {
                setFeatureArticle(res[0])
                setSubFeatureArticles([res[1], res[2]])
            })
            .then(() => {
                return fetchArticles('votes', 'desc')
            })
            .then((res) => {
                setMostVotedArticles([res[0], res[1], res[2]])
            })
            .then(() => {
                return fetchTopics()
            })
            .then((res) => {
                setTopics(res)
            })
            .catch((err) => {
                setErrorMessage("Error loading the page. Please try again.")
            })
    }, [])


    return (
        <>
            {
                errorMessage ?
                    <p>{errorMessage}</p>
                    :
                    <>
                        <h1>Breaking</h1>
                        <FeatureArticleCard key={featureArticle.article_id} articleImg={featureArticle.article_img_url} articleTitle={featureArticle.title} articleDate={featureArticle.created_at} articleAuthor={featureArticle.author} articleTopic={featureArticle.topic} articleVotes={featureArticle.votes} articleCommentCount={featureArticle.comment_count} articleId={featureArticle.article_id} />
                        {subFeatureArticles.map((article) => {
                            return <HomeArticleCard key={article.article_id} articleImg={article.article_img_url} articleTitle={article.title} articleDate={article.created_at} articleAuthor={article.author} articleTopic={article.topic} articleVotes={article.votes} articleCommentCount={article.comment_count} articleId={article.article_id} />
                        })}
                        <Link to={"/articles"}>View more articles</Link>
                        <h2>Topics:</h2>
                        <ul>
                            {topics.map((topic) => {
                                return (<li key={topic.slug}><Link to={`/topics/${topic.slug}`}>{topic.slug}</Link></li>)
                            })}
                        </ul>
                        <h2>Most Voted Articles</h2>
                        <ol>
                            {mostVotedArticles.map((article) => {
                                return <li><HomeArticleCard key={article.article_id} articleImg={article.article_img_url} articleTitle={article.title} articleDate={article.created_at} articleAuthor={article.author} articleTopic={article.topic} articleVotes={article.votes} articleCommentCount={article.comment_count} articleId={article.article_id} /></li>
                            })}

                        </ol>
                    </>
            }
        </>
    )
}

export default Home