import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { fetchArticlesByTopic, fetchTopics } from "../../api"
import TopicArticleCard from "../TopicArticleCard"
import { Link } from "react-router-dom"
import TopicsPageArticleSorter from "../TopicPageArticleSorter"


function Topic() {
    const { topic } = useParams()
    const [allArticlesOfTopic, setAllArticlesOfTopic] = useState([])
    const [topics, setTopics] = useState([])
    const [topicViewOpen, setTopicViewOpen] = useState(false)
    const [validTopicError, setValidTopicError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    useEffect(() => {
        setValidTopicError(false)
        setErrorMessage(false)
        fetchArticlesByTopic(topic)
            .then((res) => {
                setAllArticlesOfTopic(res)
            })
            .then(() => {
                return fetchTopics()
            })
            .then((res) => {
                setTopics(res)
            })
            .catch((err) => {
                if (err.response && err.status === 404) {
                    setValidTopicError(true)
                }
                else {
                    setErrorMessage(true)
                }
            })
    }, [topic])

    if (validTopicError) {
        return <Navigate to="../not-found" />
    }

    function handleTopicsListView(event) {
        event.preventDefault();
        setTopicViewOpen(!topicViewOpen)
    }

    return <>
        <h1>{`${topic[0].toUpperCase()}${topic.slice(1)}`}</h1>
        <TopicsPageArticleSorter setAllArticlesOfTopic={setAllArticlesOfTopic} topic={topic} />
        {allArticlesOfTopic.map((article) => {
            return <TopicArticleCard key={article.article_id} articleImg={article.article_img_url} articleTitle={article.title} articleDate={article.created_at} articleAuthor={article.author} articleTopic={article.topic} articleVotes={article.votes} articleCommentCount={article.comment_count} articleId={article.article_id} />
        })}
        <section className="more-topics-section">
            <button
                className="more-topics-button"
                onClick={handleTopicsListView}>View More Topics</button>
            {
                topicViewOpen ?
                    <div className="more-topics-items">
                        {topics.map((eachTopic) => {
                            if (eachTopic.slug !== topic) {
                                return (<p key={eachTopic.slug} className="more-topics-item"><Link to={`../topics/${eachTopic.slug}`}>{eachTopic.slug}</Link></p>)
                            }
                        })}
                    </div>
                    :
                    null
            }
        </section>
    </>
}

export default Topic