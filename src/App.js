import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Info from './pages/info';
import Home from './pages/Home';
import Anime from './pages/Anime';
import Series from './pages/Series';
import About_Anime from './pages/About_Anime'
import About_Series from './pages/About_Series'
import Error404 from './pages/Error404';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home title="" />} />
          <Route exact path='/anime' element={<Anime />} />
          <Route exact path='/series' element={<Series />} />
          <Route exact path="/anime/info/:id" element={<About_Anime />} />
          <Route exact path="/series/info/:id/:season" element={<About_Series />} />
          <Route exact path="/info/:imdb" element={<Info />} />
          <Route exact path='*' element={<Error404 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;