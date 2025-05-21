import { Link } from "react-router-dom"
function Footer({ username }) {

    return (
        <>
            {username ?
                <p className="footer-login-message">you are logged in as <Link to={`/users/${username}`}>{username}</Link></p>
                : <p className="footer-login-message"><Link to={`login`}>log in</Link> for all features</p>}
        </>
    )
}

export default Footer