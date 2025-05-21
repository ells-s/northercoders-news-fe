import { useState, useEffect } from "react"
import { fetchCommentsByArticleId } from "../api"
import FormattedDate from "./FormattedDate"

function CommentSection({ article_id }) {

    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchCommentsByArticleId(article_id)
            .then((res) => {
                setComments(res)

            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <section className="comment-section">
            <h3>Comments:</h3>
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
        </section>
    )
}

export default CommentSection