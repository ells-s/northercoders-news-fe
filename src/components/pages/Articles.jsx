import { useEffect, useState } from "react"
import { fetchArticles } from "../../api"
import ArticleCard from "../ArticleCard"
import ArticleSorter from "../ArticleSorter"

function Articles() {

    const [allArticles, setAllArticles] = useState([])

    useEffect(() => {
        fetchArticles()
            .then((res) => {
                setAllArticles(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <h1>All Articles</h1>
            <ArticleSorter setAllArticles={setAllArticles} />
            {allArticles.map((article) => {
                return <ArticleCard key={article.article_id} articleImg={article.article_img_url} articleTitle={article.title} articleDate={article.created_at} articleAuthor={article.author} articleTopic={article.topic} articleVotes={article.votes} articleCommentCount={article.comment_count} articleId={article.article_id} />
            })}
        </>
    )
}

export default Articles