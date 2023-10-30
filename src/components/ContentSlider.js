import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import SongCard from './SongCard';

function SongCarousel({ songs,movies }) {
  const cardPairs = [];

  const totalSongs = songs.length;

  for (let i = 0; i < totalSongs; i++) {
    const firstIndex = i;
    const secondIndex = (i + 1) % totalSongs;

    const firstCard = songs[firstIndex];
    const secondCard = songs[secondIndex];

    cardPairs.push(
      <Carousel.Item key={i}>
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-md-6">
              {firstCard && <SongCard song={firstCard} movies={movies}/>}
            </div>
            <div className="col-md-6">
              {secondCard && <SongCard song={secondCard} movies={movies}/>}
            </div>
          </div>
        </div>
      </Carousel.Item>
    );
  }

  return (
    <>
        <h1>Songs List</h1>    
    <div className="carousel-container">
    <Carousel
      style={{ width: '500px', height: '300px' }}
      data-bs-theme="dark"
      interval={5000}
      pause={false}
      wrap={true}
      showIndicators={false}
    >
      {cardPairs}
    </Carousel>
    </div>
  </>
  );
}

export default SongCarousel;
