import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Player from './components/Player';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './components/Loader';
import ContentSlider from './components/ContentSlider';
import MoviesCard from './components/MoviesCard';
import MovieDetails from './components/MovieDetails';
import {movies,songs} from './components/songs-movies/Music';
const App=()=> {
  const [loading,setLoading]=useState(true);
  useEffect(()=> {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong=songs[currentSongIndex];
  if (loading) 
  {
      return (
        <div className="App">
            <header className="App-header">
              <Loader />
            </header>
        </div>
      );
  }
  else 
  {
      return (
        <div className="App">
            <header className="App-header">
              <Router>
                  <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/player" element={<Player song={currentSong} currentSongIndex={currentSongIndex} songs={songs} setCurrentSongIndex={setCurrentSongIndex} movies={movies} />} />
                    <Route path="/songs" element={<ContentSlider songs={songs} movies={movies}/>} />
                    <Route path="/movies" element={<MoviesCard movies={movies}/>} />
                    <Route path="/movie/:id" element={<MovieDetails movies={movies} songs={songs}/>}/>
                  </Routes>
              </Router>
            </header>
        </div>
      );
  }
}

export default App;