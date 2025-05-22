import { useEffect, useState } from "react"
import { fetchArticles } from "../api"

function TopicsPageArticleSorter({ setAllArticlesOfTopic, topic }) {

    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('desc')

    useEffect(() => {
        fetchArticles(sortBy, order, topic)
            .then((res) => {
                setAllArticlesOfTopic(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [sortBy, order])

    function handleSortOption(event) {
        const value = event.target.value
        if (value === 'Votes') {
            setSortBy('votes')
        } else if (value === 'CommentCount') {
            setSortBy('comment_count')
        } else {
            setSortBy('created_at')
        }
    }

    function handleSortOrder(event) {
        const value = event.target.value
        setOrder(value.toLowerCase())
    }

    return (
        <>
            <select onChange={handleSortOption}>
                <option value="TimePosted">Time Posted</option>
                <option value="Votes">Votes</option>
                <option value="CommentCount">Comment Count</option>
            </select>
            <select onChange={handleSortOrder}>
                <option value="DESC">DESC</option>
                <option value="ASC">ASC</option>
            </select>
        </>
    )
}

export default TopicsPageArticleSorter