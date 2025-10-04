import { useState, useEffect } from "react"
import { postNewComment } from "../api"

function PostNewCommentSection({ article_id, username, newCommentPosted, setNewCommentPosted }) {

    const [commentContent, setCommentContent] = useState("")
    const [commentError, setCommentError] = useState("")
    const [loading, setLoading] = useState(false)

    function handleCommentContent(event) {
        const value = event.target.value
        setCommentContent(value)
    }

    function handleCommentSubmit(event) {
        event.preventDefault()
        setLoading(true)
        if (username && commentContent) {
            postNewComment(article_id, username, commentContent)
                .then((res) => {
                    setCommentError("")
                    setNewCommentPosted(!newCommentPosted)
                    setCommentError("Posted!")
                    setLoading(false)
                })
                .catch((err) => {
                    setLoading(false)
                    setCommentError("Something went wrong while posting you comment. Please try again!")
                })
        } else if (!username) {
            setLoading(false)
            setCommentError("Please sign in to post a comment.")
        } else if (username && !commentContent) {
            setLoading(false)
            setCommentError("Your comment can't be empty.")
        }
    }

    return (
        <section >
            <h3>Add New Comment:</h3>
            {loading ? <p>Loading...</p> : null}
            <form className="form-container">
                <label htmlFor="commentInput" className="form-label">Add a comment:</label>
                <input
                    id="commentInput"
                    type="text"
                    className="form-input"
                    onChange={handleCommentContent}
                    placeholder="Enter your comment"
                />
                <button
                    type="submit"
                    onClick={handleCommentSubmit}
                    className="button"
                >
                    Submit
                </button>
            </form>
            {commentError ? <p>{commentError}</p> : null}
        </section>
    )
}

export default PostNewCommentSection