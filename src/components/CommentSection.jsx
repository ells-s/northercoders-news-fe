import { useState, useEffect } from "react"
import { fetchCommentsByArticleId } from "../api"
import FormattedDate from "./FormattedDate"
import PostNewCommentSection from "./PostNewCommentSection"
import { deleteComment } from "../api"

function CommentSection({ article_id, username }) {

    const [comments, setComments] = useState([])
    const [newCommentPosted, setNewCommentPosted] = useState(false)
    const [commentDeleted, setCommentDeleted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [deleteCommentError, setDeleteCommentError] = useState("")
    const [commentFetchingError, setCommentFetchingError] = useState("")

    useEffect(() => {
        fetchCommentsByArticleId(article_id)
            .then((res) => {
                setCommentFetchingError("")
                setComments(res)
            })
            .catch((err) => {
                setCommentFetchingError("An error occured when trying to access the comments. Please try again.")
            })
    }, [newCommentPosted, commentDeleted])

    function handleCommentDeletion(event, commentId) {
        setLoading(true)
        deleteComment(commentId)
            .then((res) => {
                setDeleteCommentError("")
                setCommentDeleted(!commentDeleted)
                alert("Comment deleted.")
                setLoading(false)
            })
            .catch((err) => {
                setDeleteCommentError("Something went wrong. Try delete again.")
                setLoading(false)
            })
    }

    return (
        <section className="comment-section">
            <h3>Comments:</h3>
            {commentFetchingError ? <p>{commentFetchingError}</p> : null}
            {
                comments.length === 0 ?
                    <p>No comments. Would you like to be the first to add one?</p>
                    :
                    <section>
                        {deleteCommentError ? <p>{deleteCommentMessage}</p> : null}

                        {loading ? <p>Loading...</p> :

                            <>
                                {
                                    comments.map((comment) => {
                                        return (<div key={comment.comment_id} className="individual-comment">
                                            <p className="comment-username">{comment.author}</p>
                                            <p>{comment.body}</p>
                                            <div className="individual-comment-info">
                                                <FormattedDate timestamp={comment.created_at} />
                                                <p><strong>Votes:</strong> {comment.votes}</p>
                                            </div>
                                            {username === comment.author ?
                                                <button name="delete-comment"
                                                    className="delete-comment-button"
                                                    onClick={(event) => handleCommentDeletion(event, comment.comment_id)}>
                                                    delete
                                                </button>
                                                :
                                                null}
                                        </div>)
                                    })
                                }
                            </>
                        }

                    </section>
            }

            <PostNewCommentSection article_id={article_id} username={username} newCommentPosted={newCommentPosted} setNewCommentPosted={setNewCommentPosted} />

        </section>
    )
}

export default CommentSection