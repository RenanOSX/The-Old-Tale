import React from 'react';

import arrowIcon from '../../assets/icons/arrow_circle_right.png';

import './IntroductionScreen.css'; // Certifique-se de que o caminho está correto

import { textSalvamento } from '../../constants/Texts';

const IntroductionScreen = ({ introduction, onProceed }) => {
  return (
    <div className="introduction-screen">
       <div className='line1'>
        <div className="introduction-content">
          <h1>Bem-vindo ao Jogo</h1>
          <p>{introduction}</p>
        </div>

        <div className="introduction-content">
          <h1>Salvamento</h1>
          <p>{textSalvamento}</p>
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
     
      <div className='line2'>
        <div className="introduction-content">
          <h1>Progresso do Jogador</h1>
          <p>{introduction}</p>
        </div>
      </div>

      <div className="proceed-icon" onClick={onProceed}>
        <img src={arrowIcon} alt="Proceed" />
      </div>
    </div>
  );
};

export default IntroductionScreen;