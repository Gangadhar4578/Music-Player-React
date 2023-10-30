import React, { useState, useEffect } from 'react';
import  { Card, Button } from 'react-bootstrap';
import '../css/Player.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faVolumeMute,
  faVolumeLow,
  faVolumeUp,
  faVolumeHigh,
  faVolumeDown,
  faStepBackward, 
  faStepForward
} from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Slider from '@mui/material/Slider';

const Player=({song,currentSongIndex,songs,setCurrentSongIndex,movies })=>{
    const [isPlaying,setIsPlaying]=useState(false);
    const [audio]=useState(new Audio());
    const [currentTime,setCurrentTime]=useState(0);
    const [duration,setDuration]=useState(0);
    const [volume,setVolume]=useState(0.5); 
    const getVolumeIcon=()=>{
      if (volume===0) 
      {
          return faVolumeMute;
      }
      else if(volume<=0.25) 
      {
          return faVolumeLow;
      }
      else if(volume<=0.5) 
      {
          return faVolumeDown;
      }
      else if(volume<=0.75) 
      {
          return faVolumeUp;
      }
      else 
      {
          return faVolumeHigh;
      }
  };
  const updateVolume=(value)=>{
      audio.volume=value;
      setVolume(value);
  };
  useEffect(()=>{
      if(isPlaying) 
      {
          audio.play();
      }
      else 
      {
          audio.pause();
      }
      const updateTime=()=>{
          setCurrentTime(audio.currentTime);
          setDuration(audio.duration);
      };

      const handleSongEnded=()=>{
          setIsPlaying(false);
          setCurrentTime(0);
      };

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('ended', handleSongEnded);

      return ()=>{
          audio.removeEventListener('timeupdate', updateTime);
          audio.removeEventListener('ended', handleSongEnded);
      };
  }, [isPlaying, audio]);

  useEffect(()=>{
      const updateTime=()=>{
          setCurrentTime(audio.currentTime);
          setDuration(audio.duration);
      };
      audio.addEventListener('timeupdate', updateTime);
      return ()=>{
          audio.removeEventListener('timeupdate', updateTime);
      };
  }, [audio]);
  const togglePlay=()=>{
      setIsPlaying(!isPlaying);
  };
  const formatTime=(timeInSeconds)=>{
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const updateCurrentTime=(newTime)=>{
      audio.currentTime=newTime;
  };
  const nextSong=()=>{
      const newIndex=(currentSongIndex + 1)%songs.length;
      setCurrentSongIndex(newIndex);
      audio.src=songs[newIndex].src;
      setIsPlaying(true);
  };
  const previousSong=()=>{
      const newIndex=(currentSongIndex-1+songs.length)%songs.length;
      setCurrentSongIndex(newIndex);
      audio.src = songs[newIndex].src;
      setIsPlaying(true);
  };
  useEffect(()=>{
    audio.src=song.src;
    audio.autoplay=true;
  },[song.src]);
  return (
    <>
    <br/>
    <Card className="player-card">
        <div className={`song-image d-flex align-items-center justify-content-center ${isPlaying?'rotate':''}`}>
          <Card.Img
            variant="top"
            src={song.movieId ? movies[song.movieId - 1].image : '/images/Music_img.png'}
            alt="Song Cover"
            className={`img-fluid rounded-circle ${isPlaying ? 'rotate' : ''}`}
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