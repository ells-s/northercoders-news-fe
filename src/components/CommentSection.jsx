import { useState, useEffect } from "react"
import { fetchCommentsByArticleId } from "../api"
import FormattedDate from "./FormattedDate"
import PostNewCommentSection from "./PostNewCommentSection"

function CommentSection({ article_id, username }) {

    const [comments, setComments] = useState([])
    const [newCommentPosted, setNewCommentPosted] = useState(false)

    useEffect(() => {
        fetchCommentsByArticleId(article_id)
            .then((res) => {
                setComments(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [newCommentPosted])

    return (
        <section className="comment-section">
            <h3>Comments:</h3>
            {
                comments.length === 0 ?
                    <p>No comments. Would you like to be the first to add one?</p>
                    :
                    <section>
                        {comments.map((comment) => {
                            return (<div key={comment.comment_id} className="individual-comment">
                                <p className="comment-username">{comment.author}</p>
                                <p>{comment.body}</p>
                                <div className="individual-comment-info">
                                    <FormattedDate timestamp={comment.created_at} />
                                    <p><strong>Votes:</strong> {comment.votes}</p>
                                </div>
                            </div>)
                        })}
                    </section>
            }

            <PostNewCommentSection article_id={article_id} username={username} newCommentPosted={newCommentPosted} setNewCommentPosted={setNewCommentPosted} />

        </section>
    )
}

export default CommentSection