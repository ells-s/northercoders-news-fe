import { Link, useNavigate } from "react-router-dom"
import { fetchTopics } from "../../api"
import { useEffect, useState } from "react"

function Header({ username, setUsername }) {

    const [topics, setTopics] = useState([])

    useEffect(() => {
        fetchTopics()
            .then((res) => {
                setTopics(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    let navigate = useNavigate();

    const [navbarOpen, setNavBarOpen] = useState(false)

    function handleNavbarView(event) {
        event.preventDefault();
        setNavBarOpen(!navbarOpen)
    }

    function handleLogOut(event) {
        event.preventDefault();
        setUsername("")
        navigate("/")
    }



    return (
        <header className="header">
            <button onClick={handleNavbarView}>menu</button>
            {navbarOpen ?
                <nav className="menu-nav">
                    <Link to="/" className="menu-item">Home</Link>
                    {username ?
                        <Link to={`/users/${username}`}>Profile</Link>
                        :
                        <Link to="/login" className="menu-item">Login</Link>}
                    <Link to="/articles" className="menu-item">All Articles</Link>
                    {username ? <button onClick={handleLogOut} className="menu-item" >log out</button> : null}
                    {topics.map((topic) => {
                        return (<Link to={`/topics/${topic.slug}`} className="menu-item" >{`${topic.slug[0].toUpperCase()}${topic.slug.slice(1)}`}</Link>)
                    })}
                </nav>
                :
                null
            }
        </header >
    )
}

export default Header