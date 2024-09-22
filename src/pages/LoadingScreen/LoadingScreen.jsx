import React from 'react';

import './LoadingScreen.css'; 

const LoadingScreen = ({ logs, currentLog }) => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Carregando...</p>
      <div className="logs">
        {logs.map((log, index) => (
          <div key={index} className="log">
            {log}
          </div>
        ))}
        <div className="log">{currentLog}</div>
      </div>
    </div>
  );
};

export default LoadingScreen;