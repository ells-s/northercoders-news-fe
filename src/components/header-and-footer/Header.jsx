import { Link, useNavigate } from "react-router-dom"
import { fetchTopics } from "../../api"
import { useEffect, useState } from "react"
import menuIconWhite from "../../icons/menu-icon-white.png";
import menuIconOffWhite from "../../icons/menu-icon-f3f1eb.png";

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
            <div className="header-bar">
                <h1><Link to={"/"} className="logo">NC NEWS</Link></h1>
                <button
                    className="menu-icon-button"><img
                        src={!navbarOpen ? menuIconWhite : menuIconOffWhite}
                        alt="Menu Icon"
                        className="menu-icon-img"
                        onClick={handleNavbarView} /></button>
            </div>
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
                    {username ? <button onClick={handleLogOut} className="menu-item-button" >log out</button> : null}
                </nav>
                :
                null
            }
        </header >
    )
}

export default Header