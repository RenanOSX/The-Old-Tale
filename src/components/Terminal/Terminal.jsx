import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';
import handleCommand from './commandHandler';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

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

  const processCommand = (command) => {
    if (command.trim() === '') return;

    const result = handleCommand(command, run);

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
      <div id="youtube-player"></div>
    </div>
  );
};

export default Terminal;