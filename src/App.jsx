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
import NotFound from './components/pages/NotFound';
import Topics from './components/pages/Topics';


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
        <Route path="/articles/:article_id" element={<Article username={username} />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topic" element={<Topic />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/not-found' element={<NotFound />} />
      </Routes>
      <Footer username={username}></Footer>
    </div >
  )
}

export default App
