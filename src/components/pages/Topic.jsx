import { useParams } from "react-router-dom"

function Topic() {
    const { topic } = useParams()
    return <>
        <h1>TOPIC PAGE: {topic}</h1>
    </>
}

export default Topic