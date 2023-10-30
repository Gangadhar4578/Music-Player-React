import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import Slider from '@mui/material/Slider';
import Popup from 'reactjs-popup';
import '../css/Player.css';
import useAudio from './Audio'; // Import the custom audio hook

const Player = ({ song, currentSongIndex, songs, setCurrentSongIndex, movies }) => {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    updateVolume,
    togglePlay,
    formatTime,
    updateCurrentTime,
    nextSong,
    previousSong,
    getVolumeIcon
  } = useAudio(song, currentSongIndex, songs, setCurrentSongIndex);

  return (
    <>
     <br/>
     <Card className="player-card">
         <div className={`song-image d-flex align-items-center justify-content-center ${isPlaying?'rotate':''}`}>
           <Card.Img
            variant="top"
            src={song.movieId ? movies[song.movieId - 1].image : '/images/Music_img.png'}
            alt="Song Cover"
            className={`img-fluid rounded-circle ${isPlaying ? 'rotate' : 'rotate-stop'}`}
            style={{ maxWidth: '50%', maxHeight: '50%',border: '5px solid #000', }}
          />
        </div>
        <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title>{song.title}</Card.Title>
        <Card.Text>{song.artist || 'Unknown Artist'}</Card.Text>
        <div className="audio-controls">
            <Button onClick={previousSong} variant="primary">
                <FontAwesomeIcon icon={faStepBackward} />
            </Button>
            <Button onClick={togglePlay} variant="primary">
                {isPlaying ? (
                    <FontAwesomeIcon icon={faPause} />
                ):(
                    <FontAwesomeIcon icon={faPlay} />
                )}
            </Button>
            <Button onClick={nextSong} variant="primary">
                <FontAwesomeIcon icon={faStepForward} />
            </Button>
            <Popup className="vertical-range-container" position="top vertical-range-container"
                trigger={
                <Button>
                    <FontAwesomeIcon icon={getVolumeIcon()} />{' '}
                </Button>
                }>
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
              onChange={(e) => updateCurrentTime(e.target.value)}
            />
            <div className="d-flex align-items-center justify-content-between">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    </Card.Body>
  </Card>
  <div className="song-list">
        <h2>Song List</h2>
        <ul>
          {songs.map((songItem, index)=>(
            <li key={index}>
              {currentSongIndex===index?(<strong>{songItem.title}</strong>):(<span>{songItem.title}</span>)}
            </li>
          ))}
        </ul>
      </div>
  </>
  );
};

export default Player;