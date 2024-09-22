import React from 'react';
import './IntroductionScreen.css'; // Certifique-se de que o caminho está correto

const IntroductionScreen = ({ introduction, onProceed }) => {
  return (
    <div className="introduction-screen">
      <div className="introduction-content">
        <h1>Bem-vindo ao Jogo</h1>
        <p>{introduction}</p>
        <button onClick={onProceed}>Começar</button>
      </div>
    </div>
  );
};

export default IntroductionScreen;