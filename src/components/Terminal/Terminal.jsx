import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './Terminal.css';
import handleCommand from './commandHandler';

const API_KEY = 'AIzaSyBx7vyaPYvBj_H_I6axliWpACT5Uxmq_7A';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [videoId, setVideoId] = useState(''); // State to store the YouTube video ID
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [volume, setVolume] = useState(50); // State to store the volume level
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        processCommand(input);
      } else if (e.key === 'ArrowUp') {
        navigateHistory(-1);
      } else if (e.key === 'ArrowDown') {
        navigateHistory(1);
      }
    };

    const handleFocus = () => {
      inputRef.current.focus();
    };

    const terminal = terminalRef.current;
    terminal.addEventListener('keydown', handleKeyDown);
    terminal.addEventListener('click', handleFocus);

    return () => {
      terminal.removeEventListener('keydown', handleKeyDown);
      terminal.removeEventListener('click', handleFocus);
    };
  }, [input, history, historyIndex]);
  
  useEffect(() => {
    // Load the YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = `https://www.youtube.com/iframe_api?key=${API_KEY}`;
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize the player when the API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: '',
        playerVars: {
          controls: 0, // Hide default controls
          modestbranding: 1, // Hide YouTube logo
          rel: 0, // Do not show related videos at the end
          iv_load_policy: 3, // Hide video annotations
        },
        events: {
          onReady: () => {
            setIsPlayerReady(true);
            playerRef.current.setVolume(volume); // Set initial volume
          },
        },
      });
    };
  }, [volume]);

  const processCommand = (command) => {
    if (command.trim() === '') return;

    const result = handleCommand(command, run, exit);

    if (result.type === 'clear') {
      setOutput([]);
      setInput('');
      return;
    }

    setOutput((prevOutput) => [
      ...prevOutput,
      { text: `root@linux:~$ ${command}`, type: 'command' },
      { text: result.text, type: result.type },
    ]);
    setHistory((prevHistory) => [...prevHistory, command]);
    setHistoryIndex(-1);
    setInput('');
  };

  const navigateHistory = (direction) => {
    let newIndex = historyIndex + direction;
    if (newIndex < 0) newIndex = -1;
    if (newIndex >= history.length) newIndex = history.length - 1;

    setHistoryIndex(newIndex);

    if (newIndex === -1) {
      setInput('');
    } else {
      setInput(history[newIndex]);
    }
  };
 
 
  const run = (url) => {
    const videoId = new URL(url).searchParams.get('v');
    setVideoId(videoId);
    if (isPlayerReady && playerRef.current) {
      playerRef.current.loadVideoById(videoId);
    }
  };

  const exit = () => {
    setVideoId('');
    if (isPlayerReady && playerRef.current) {
      playerRef.current.stopVideo();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handlePlayButtonClick = () => {
    if (isPlayerReady && playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const handlePauseButtonClick = () => {
    if (isPlayerReady && playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  const handleStopButtonClick = () => {
    if (isPlayerReady && playerRef.current) {
      playerRef.current.stopVideo();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (isPlayerReady && playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  return (
    <div className="terminal" tabIndex="0" ref={terminalRef}>
      <div className="output">
        {output.map((line, index) => (
          <div key={index} className={`output-line ${line.type}`}>
            {line.text}
          </div>
        ))}
      </div>
      <div className="input-line">
        <span className="prompt">root@linux:~$</span>
        <span className="input-area">
          &nbsp;{input}
          <span className="blinking-cursor"></span>
        </span>
        <input
          type="text"
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          className="hidden-input"
        />
      </div>
    {videoId && (
        <div className="player-wrapper vintage">
          <iframe
            id="youtube-player"
            type="text/html"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
            frameBorder="0"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Terminal;