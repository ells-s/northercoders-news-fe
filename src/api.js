import axios from "axios"

const ncNewsApi = axios.create({
    baseURL: "https://ells-s-nc-news.onrender.com/api"
})

export const fetchArticles = (sort_by = 'created_at', order = 'desc') => {
    return ncNewsApi
        .get(`/articles?sort_by=${sort_by}&order=${order}`)
        .then(({ data }) => {
            return data.articles
        })
}

export const fetchTopics = () => {
    return ncNewsApi
        .get("/topics")
        .then(({ data }) => {
            return data.topics
        })
}