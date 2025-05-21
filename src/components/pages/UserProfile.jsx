import { useParams } from "react-router-dom"
function UserProfile() {
    const { user } = useParams()

    return (
        <>
            <h1>User Profile {user}</h1>
        </>
    )
}

export default UserProfile