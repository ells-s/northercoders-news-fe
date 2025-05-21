import { Link, useNavigate } from "react-router-dom"
import { fetchTopics } from "../../api"
import { useEffect, useState } from "react"

function Header({ username, setUsername }) {

    let navigate = useNavigate();
    //fetch topics loop through to display topics as links

    function handleLogOut(event) {
        event.preventDefault();
        setUsername("")
        navigate("/")
    }

    return (
        <header className="header">
            <nav>
                <Link to="/">Home</Link>
                {username ? <Link to={`/users/${username}`}>Profile</Link> : <Link to="/login">Login</Link>}
                <Link to="/articles">Articles</Link>
                {username ? <button onClick={handleLogOut}>log out</button> : null}

            </nav>
        </header >
    )
}

export default Header