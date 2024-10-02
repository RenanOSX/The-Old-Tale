import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';
import handleCommand from './commandHandler';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [clearInputInterval, setClearInputInterval] = useState(null);
  const [loadingDots, setLoadingDots] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !isLoading) {
        processCommand(input);
      } else if (e.key === 'ArrowUp') {
        navigateHistory(-1);
      } else if (e.key === 'ArrowDown') {
        navigateHistory(1);
      }
    };

    const terminal = terminalRef.current;
    terminal.addEventListener('keydown', handleKeyDown);

    return () => {
      terminal.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, history, historyIndex, isLoading]);

  useEffect(() => {
    // Carregar a API do YouTube
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Inicializar o player quando a API estiver pronta
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: '',
        events: {
          onReady: () => {
            setIsPlayerReady(true);
          },
        },
      });
    };
  }, []);

  useEffect(() => {
    const handleClick = () => {
      inputRef.current.focus();
    };

    const terminal = terminalRef.current;
    terminal.addEventListener('click', handleClick);

    return () => {
      terminal.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    let intervalId;
    if (isLoading) {
      intervalId = setInterval(() => {
        setLoadingDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
      }, 500);
    } else {
      setLoadingDots('');
    }
    return () => clearInterval(intervalId);
  }, [isLoading]);

  const processCommand = async (command) => {
    if (command.trim() === '') return;

    setIsLoading(true);

    // Start interval to clear input every second
    const intervalId = setInterval(() => {
      setInput('');
    }, 50);
    setClearInputInterval(intervalId);

    const result = await handleCommand(command, run);

    clearInterval(intervalId); // Clear the interval when done
    setClearInputInterval(null);
    setIsLoading(false);

    if (!result) {
      setOutput((prevOutput) => [
        ...prevOutput,
        { text: `root@linux:~$ ${command}`, type: 'command' },
        { text: 'Unknown error occurred.', type: 'error' },
      ]);
      setInput('');
      inputRef.current.focus(); // Ensure input is focused
      return;
    }

    if (result.type === 'clear') {
      setOutput([]);
      setInput('');
      inputRef.current.focus(); // Ensure input is focused
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
    inputRef.current.focus(); // Ensure input is focused
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
    inputRef.current.focus(); // Ensure input is focused
  };

  const run = (url) => {
    if (isPlayerReady && playerRef.current) {
      playerRef.current.loadVideoByUrl(url);
    } else {
      console.error('YouTube player is not initialized.');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
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
      {isLoading && (
        <div className="loading-message">
          <div>Loading{loadingDots} Please wait.</div>
          <div>Do not press Enter again or the process will be executed again.</div>
        </div>
      )}
      <div id="youtube-player"></div>
    </div>
  );
};

export default Terminal;