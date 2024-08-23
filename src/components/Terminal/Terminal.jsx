import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';
import handleCommand from './commandHandler';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        processCommand(input);
      } else if (e.key === 'ArrowUp') {
        navigateHistory(-1);
      } else if (e.key === 'ArrowDown') {
        navigateHistory(1);
      } else if (e.key === 'Backspace') {
        setInput(input.slice(0, -1));
      } else if (e.key.length === 1) {
        setInput(input + e.key);
      }
    };

    const handleFocus = () => {
      terminalRef.current.focus();
    };

    const terminal = terminalRef.current;
    terminal.addEventListener('keydown', handleKeyDown);
    terminal.addEventListener('click', handleFocus);

    return () => {
      terminal.removeEventListener('keydown', handleKeyDown);
      terminal.removeEventListener('click', handleFocus);
    };
  }, [input, history, historyIndex]);

  const processCommand = (command) => {
    if (command.trim() === '') return;

    const result = handleCommand(command);

    if (result.type === 'clear') {
      setOutput([]);
      setInput('');
      return;
    }

    // Clear the output from the terminal to don't be too big
    // if (output.length >= 12) {
    //   setOutput([]);
    // }
    setOutput((prevOutput) => [
      ...prevOutput,
      { text: `root@linux:~$ ${command}`, type: 'command' },
      { text: result.text, type: result.type }, // Add type for styling
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

  return (
    <div className="terminal" tabIndex="0" ref={terminalRef}>
      <div className="output">
        {output.map((line, index) => (
          <div
            key={index}
            className={`output-line ${line.type}`}
          >
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
      </div>
    </div>
  );
};

export default Terminal;