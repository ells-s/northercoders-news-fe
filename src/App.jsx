import { useState } from 'react'
import Header from './components/header-and-footer/Header'
import { Route, Routes } from "react-router-dom";
import Articles from './components/pages/Articles';
import Home from './components/pages/Home'
import Footer from './components/header-and-footer/Footer';
import Article from './components/pages/Article';
import Topic from './components/pages/Topic';
import LoginPage from './components/pages/LoginPage';
import UserProfile from './components/pages/UserProfile';

function App() {

  const [username, setUsername] = useState("")

  return (
    < div className="app-outlines">
      <Header username={username} setUsername={setUsername}></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage username={username} setUsername={setUsername} />} />
        <Route path="/users/:user" element={<UserProfile username={username} />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/topics/:topic" element={<Topic />} />
      </Routes>
      <Footer username={username}></Footer>
    </div >
  )
}

export default App
