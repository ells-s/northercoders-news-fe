import { Link, useNavigate } from "react-router-dom"
import { fetchTopics } from "../../api"
import { useEffect, useState } from "react"
import menuIconDark from "../../icons/menu-icon-dark-blue.png";
import menuIconLight from "../../icons/menu-icon-lighter-blue.png";

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
            <button
                className="menu-icon-button"><img
                    src={!navbarOpen ? menuIconDark : menuIconLight}
                    // src="src/icons/menu-icon-dark-blue.png"
                    alt="Menu Icon"
                    className="menu-icon-img"
                    onClick={handleNavbarView} /></button>
            {navbarOpen ?
                <nav className="menu-nav">
                    <Link to="/" className="menu-item">Home</Link>
                    {username ?
                        <Link to={`/users/${username}`}>Profile</Link>
                        :
                        <Link to="/login" className="menu-item">Login</Link>}
                    <Link to="/articles" className="menu-item">All Articles</Link>
                    {topics.map((topic) => {
                        return (<Link to={`/topics/${topic.slug}`} key={topic.slug} className="menu-item" >{`${topic.slug[0].toUpperCase()}${topic.slug.slice(1)}`}</Link>)
                    })}
                    {username ? <button onClick={handleLogOut} className="menu-item" >log out</button> : null}
                </nav>
                :
                null
            }
        </header >
    )
}

export default Header