import { useEffect, useState } from "react"
import { fetchArticleById, updateArticleVotes } from "../api"


function ArticleVotingOption({ username, article_id }) {
    const [votes, setVotes] = useState(null)
    const [author, setAuthor] = useState('')
    const [userHasUpVoted, setUserHasUpVoted] = useState(false)
    const [userHasDownVoted, setUserHasDownVoted] = useState(false)
    const [voteError, setVoteError] = useState("")

    useEffect(() => {
        setVoteError("")
        fetchArticleById(article_id)
            .then((res) => {
                setVotes(res.votes)
                setAuthor(res.author)
            })
            .catch((err) => {
                setVoteError("Something went wrong")
            })
    }, [])

    function handleVoteInc(event) {
        event.preventDefault();
        if (!userHasUpVoted && !userHasDownVoted) {
            updateArticleVotes(article_id, 1)
                .then(() => {
                    setVotes(votes + 1)
                    setUserHasUpVoted(true)
                    setVoteError("")
                })
                .catch((err) => {
                    if (!voteError) setVotes(votes - 1)
                    setVoteError("Something went wrong")

                })
        } else if (userHasDownVoted) {
            updateArticleVotes(article_id, 1)
                .then(() => {
                    setVotes(votes + 1)
                    setUserHasDownVoted(false)
                    setVoteError("")
                })
                .catch((err) => {
                    if (!voteError) setVotes(votes - 1)
                    setVoteError("Something went wrong")
                })
        }
    }

    function handleVoteDec(event) {
        event.preventDefault();
        if (!userHasUpVoted && !userHasDownVoted) {
            updateArticleVotes(article_id, -1)
                .then(() => {
                    setVotes(votes - 1)
                    setUserHasDownVoted(true)
                    setVoteError("")
                })
                .catch((err) => {
                    if (!voteError) setVotes(votes + 1)
                    setVoteError("Something went wrong")
                })
        } else if (userHasUpVoted) {
            updateArticleVotes(article_id, -1)
                .then(() => {
                    setVotes(votes - 1)
                    setUserHasUpVoted(false)
                    setVoteError("")
                })
                .catch((err) => {
                    if (!voteError) setVotes(votes + 1)
                    setVoteError("Something went wrong")
                })
        }
    }

    return (
        <div className="voting-section">
            <p><span>Votes:</span> {votes}</p>
            {username ?
                username !== author ?
                    <div>
                        <button
                            name="up-vote"
                            className={userHasUpVoted ? "voted-button-selected" : "voted-button"}
                            onClick={handleVoteInc}>↑</button>
                        <button
                            name="down-vote"
                            className={userHasDownVoted ? "voted-button-selected" : "voted-button"}
                            onClick={handleVoteDec}>↓</button>
                        {voteError ? <p className="voting-message">{voteError}</p> : null}
                    </div>
                    :
                    <>
                        <div>
                            <button name="up-vote" className="voted-button-disabled" onClick={handleVoteInc} disabled={true}>↑</button>
                            <button name="down-vote" className="voted-button-disabled" onClick={handleVoteDec} disabled={true}>↓</button>
                        </div>
                        <p className="voting-message">you cannot vote for your own articles</p>
                    </>
                : <p className="voting-message">must log in to vote</p>
            }
        </div>
    )
}

export default ArticleVotingOption