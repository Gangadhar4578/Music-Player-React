import React from 'react';
import { Card, Button, CardGroup } from 'react-bootstrap';

const SongCard = ({ song,movies }) => {
  return (

    <CardGroup>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" 
        src={song.movieId ? movies[song.movieId - 1].image : '/images/Music_img.png'}
        alt={song.title} />
        <Card.Body>
          <Card.Title>{song.title}</Card.Title>
          <small style={{ fontSize: '12px' }}>{movies[song.movieId-1].name}</small>
          <Card.Footer className="text-muted"><Button variant="primary">Play</Button></Card.Footer>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}

export default SongCard;
