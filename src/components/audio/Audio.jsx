import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import moment from 'moment';
import axios from 'axios';
import PlayIcon from 'images/playIcon';
import PauseIcon from 'images/pauseIcon';
import CloseIcon from 'images/closeIcon';
import DownloadActiveIcon from 'images/downloadActiveIcon';
import url from './test.mp3';
import './Audio.scss';

function AudioBlock(props) {
  const element = useRef(null);
  const intervalRef = useRef();

  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timePlayed, setTimePlayed] = useState('');

  const startTimer = () => {
    clearInterval(intervalRef.current);
    const duration = element.current?.duration;

    intervalRef.current = setInterval(() => {
      if (element.current?.ended) {
        setPercentage(0);
      } else {
        const currentPercentage = duration ? (element.current?.currentTime / duration) * 100 : 0;
        setPercentage(currentPercentage);
      }
    }, [1000]);
  }

  const getProgressBar = useCallback(() => {
    return (
        <div
            className='progress-bar'
        >
            <div style={{ width: `${percentage}%`}} />
        </div>
    )
  }, [percentage])

  const playRecord = (url, data) => {
    return axios({
        url,
        method: 'POST',
        responseType: 'blob',
        headers: {
        'Authorization': 'Bearer testtoken',
        'Content-type': "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
        'Content-Transfer-Encoding': 'binary',
        'Content-Disposition': 'filename="record.mp3"',
        },
      })
        .then(response => {
          const href = window.URL.createObjectURL(response.data);
    
          const anchorElement = document.createElement('a');
    
          anchorElement.href = href;
          anchorElement.download = '1.mp3';
    
          document.body.appendChild(anchorElement);
          anchorElement.click();
    
          document.body.removeChild(anchorElement);
          window.URL.revokeObjectURL(href);
        })
        .catch(error => {
          console.log('error: ', error);
        });
  };

  useEffect(() => {
    setTimePlayed(moment.utc((element.current?.currentTime)*1000).format('mm:ss'))
  }, [element.current?.played])


  return (
    <div>
        <div className='custom-player'>
            <div className='current-time'>
                {timePlayed}
            </div>
            <div className='control'>
            {
                isPlaying ? (
                    <button
                        onClick={() => {
                            setIsPlaying(false);
                            element.current.pause();
                        }}
                    >
                        <PauseIcon />
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            setIsPlaying(true);
                            startTimer();
                            element.current.play();
                        }}
                    >
                        <PlayIcon />
                    </button>
                )
            }
            </div>
            <div className='progress-bar-container'>
                {getProgressBar()}
            </div>
            <div className='download' >
                <button
                    onClick={() => {
                        // element.current.load();
                        playRecord(props.url, {})
                    }}
                >
                    <DownloadActiveIcon />
                </button>
            </div>
            <div>
              <button
                    onClick={() => {
                        element.current.pause()
                        props.setIsPlaying(null)
                    }}
                >
                  <CloseIcon />
                </button>
            </div>
        </div>
        
        <audio src={url} ref={element} controls className='audio'>
            <source src="audio/music.ogg" type="audio/ogg; codecs=vorbis" />
            <source src={props.url} type="audio/mpeg" />
        </audio>
    </div>
  )
}

export default AudioBlock;