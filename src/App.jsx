import { useState } from 'react'
import Header from './components/header-and-footer/Header'
import { Route, Routes } from "react-router-dom";
import Articles from './components/pages/Articles';
import Home from './components/pages/Home'
import Footer from './components/header-and-footer/Footer';
import Article from './components/pages/Article';

function App() {


  return (
    < div className="app-outlines">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
      </Routes>
      <Footer></Footer>
    </div >
  )
}

export default App
