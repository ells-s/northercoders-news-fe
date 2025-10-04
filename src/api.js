import axios from "axios"
import { useParams } from "react-router-dom"

const ncNewsApi = axios.create({
    baseURL: "https://ells-s-nc-news.onrender.com/api"
})

export const fetchArticles = (sort_by = 'created_at', order = 'desc', topic = null) => {
    const params = { sort_by, order }
    if (topic) params.topic = topic

    return ncNewsApi
        .get('/articles', { params })
        .then(({ data }) => {
            return data.articles
        })
}

export const fetchArticleById = (article_id) => {
    return ncNewsApi
        .get(`/articles/${article_id}`)
        .then(({ data }) => {
            return data.article[0]
        })
}

export const fetchCommentsByArticleId = (article_id) => {
    return ncNewsApi
        .get(`/articles/${article_id}/comments`)
        .then(({ data }) => {
            return data.comments
        })
}

export const fetchTopics = () => {
    return ncNewsApi
        .get("/topics")
        .then(({ data }) => {
            return data.topics
        })
}

export const fetchUsers = () => {
    return ncNewsApi
        .get("/users")
        .then(({ data }) => {
            return data.users
        })
}

export const updateArticleVotes = (article_id, numOfVotesToPatch) => {
    return ncNewsApi
        .patch(`/articles/${article_id}`, { inc_votes: numOfVotesToPatch })
        .then((res) => {
            console.log(res)
        })
}

export const postNewComment = (article_id, username, commentContent) => {
    return ncNewsApi
        .post(`/articles/${article_id}/comments`, { username: username, body: commentContent })
        .then((res) => {
            console.log(res)
        })
}

export const deleteComment = (commentId) => {
    return ncNewsApi
        .delete(`/comments/${commentId} `)
        .then((res) => {
            console.log(res)
        })
}

export const fetchArticlesByTopic = (topic) => {
    return ncNewsApi
        .get(`articles?topic=${topic}`)
        .then(({ data }) => {
            return data.articles
        })
}

export const fetchUserByUsername = (username) => {
    return ncNewsApi
        .get(`/users/${username}`)
        .then(({ data }) => {
            return data.user[0];
        });
};