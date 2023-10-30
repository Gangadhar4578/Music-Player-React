import { useState, useEffect } from 'react';
import {
//   faPlay,
//   faPause,
  faVolumeMute,
  faVolumeLow,
  faVolumeUp,
  faVolumeHigh,
  faVolumeDown,
//   faStepBackward, 
//   faStepForward
} from '@fortawesome/free-solid-svg-icons';
const useAudio = (song, currentSongIndex, songs, setCurrentSongIndex) => {
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const setupAudio = () => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    const handleSongEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleSongEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleSongEnded);
    };
  };

  const updateVolume = (value) => {
    audio.volume = value;
    setVolume(value);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const updateCurrentTime = (newTime) => {
    audio.currentTime = newTime;
  };

  const nextSong = () => {
    const newIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(newIndex);
    audio.src = songs[newIndex].src;
    setIsPlaying(true);
  };

  const previousSong = () => {
    const newIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(newIndex);
    audio.src = songs[newIndex].src;
    setIsPlaying(true);
  };
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
  useEffect(() => {
    audio.src = song.src;
    audio.autoplay = true;
  }, [song.src]);

  useEffect(setupAudio, [isPlaying, audio]);

  return {
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
  };
};

export default useAudio;
