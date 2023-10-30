import { useParams } from 'react-router-dom';
import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import '../css/Player.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStepBackward,
  faStepForward
} from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Slider from '@mui/material/Slider';
import useAudio from './Audio';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css"
/>

const MovieDetails = ({ movies, songs }) => {
  const { id } = useParams();
  const movie = movies[id];

  const movieSongs = songs.filter((song) => song.movieId === movie.id);
  const { isPlaying, currentTime, duration, volume, updateVolume, togglePlay, formatTime, updateCurrentTime, nextSong, previousSong, getVolumeIcon } = useAudio(movieSongs[0], 0, movieSongs, () => { });


  if (!movie) 
  {
    return <div>No Movie Found</div>;
  }

  return (
    <>
    <h1>{movie.name} Movie</h1>
        <Container>
        <Row>
        <Col md={4}>
            <Card>
            <Card.Img variant="top" src={movie.image} alt={movie.name} />
            <Card.Body>
                <Card.Title>{movie.name} Details</Card.Title>
                <Card.Text>
                <strong>Director:</strong> {movie.director}
                </Card.Text>
                <Card.Text>
                <strong>Date:</strong> {movie.release_date}
                </Card.Text>
                <Card.Text>
                <strong>Language:</strong> {movie.language}
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>
        <Col md={8}>
            <h3>Songs</h3>
            <ol className="song-list-item">
            {movieSongs.map((song, index) => (
                <li key={song.id}>
                    <div className="d-flex justify-content-between">
                        <span>{song.title}</span>
                        <br />
                        <small>
                        ({movie.name} - {movie.language})
                        </small>
                    </div>
                    <div className="audio-controls">
                        <Button
                            onClick={previousSong}
                            variant="primary"
                            disabled={index === 0}
                        >
                            <FontAwesomeIcon icon={faStepBackward} />
                        </Button>
                        <Button onClick={togglePlay} variant="primary">
                            {isPlaying ? (
                            <FontAwesomeIcon icon={faPause} />
                            ) : (
                            <FontAwesomeIcon icon={faPlay} />
                            )}
                        </Button>
                        <Button
                            onClick={nextSong}
                            variant="primary"
                            disabled={index === movieSongs.length - 1}
                        >
                            <FontAwesomeIcon icon={faStepForward} />
                        </Button>
                        <Popup
                        className="vertical-range-container"
                        position="top vertical-range-container"
                        trigger={
                            <Button>
                            <FontAwesomeIcon icon={getVolumeIcon()} />{' '}
                            </Button>
                        }
                        >
                        <Slider
                            value={volume}
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={(e, newValue) => updateVolume(newValue)}
                            aria-labelledby="volume-range"
                        />
                        </Popup>
                        <Slider
                        defaultValue={0}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        value={currentTime}
                        max={duration}
                        onChange={(e, newValue) => updateCurrentTime(newValue)}
                        />
                        <div className="d-flex align-items-center justify-content-center">
                        <span>{formatTime(currentTime)}</span>
                        <span>/</span>
                        <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                </li>
                ))}
            </ol>
        </Col>
        </Row>
    </Container>
  </>
  );
};

export default MovieDetails;
