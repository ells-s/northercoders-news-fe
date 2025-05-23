import { useEffect, useState } from "react"
import { fetchArticles } from "../api"

function TopicsPageArticleSorter({ setAllArticlesOfTopic, topic }) {

    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('desc')
    const [sortingError, setSortingError] = useState("")

    useEffect(() => {
        setSortingError("")
        fetchArticles(sortBy, order, topic)
            .then((res) => {
                setAllArticlesOfTopic(res)
            })
            .catch((err) => {
                setSortingError("An error occured while trying to the sort articles, please try again.")
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
            {sortingError ? <p>{sortingError}</p> : null}
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