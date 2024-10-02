import React, { useEffect, useState } from 'react';

import { useSpring, animated } from '@react-spring/web';

import './BarraLateralDireita.css'

import yinYangBtn from '/assets/icons/yin_yang_button.png'

import arrowDown from '/assets/icons/arrow_down.png'

import JogadorInfo from '../JogadorInfo/JogadorInfo';

import Popup from '../PopUpInputTheme.jsx/PopUpInputTheme';

function BarraLateralDireita({ player, setTheme, color }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleYinYangClick = () => {
    if (player.moedas >= 200) {
      setIsPopupVisible(true);
    } else {
      setErrorMessage('Moedas insuficientes');
      setTimeout(() => setErrorMessage(''), 3000); 
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false); 
  };

  const handleFormSubmit = () => {
    setIsPopupVisible(false); 
  };

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const errorAnimation = useSpring({
    opacity: errorMessage ? 1 : 0,
    transform: errorMessage ? 'translateY(0)' : 'translateY(-20px)',
    config: { duration: 300 },
  });

  const subtleColor = hexToRgba(color, 0.5);

  return (
    <aside className="stats-info"  style={{ background: `linear-gradient(180deg, #070707 99%,  ${subtleColor} 100%)` }}>
      <div className='title-gerar-mundo'>
        "GERE UM NOVO TEMA"
      </div>
        
      <img src={arrowDown} className='arrow-down' alt="Arrow Down"/>

      <button className='yin-yang-btn' onClick={handleYinYangClick}>
        <img src={yinYangBtn} alt="Yin Yang Button"/>
      </button>

      <div className="money-right">
        200 GC
      </div>

      <animated.div style={errorAnimation} className="error-message">
        {errorMessage}
      </animated.div>
    
      <JogadorInfo jogador={player} />

      <Popup
        isVisible={isPopupVisible}
        onClose={handleClosePopup}
        onSubmit={handleFormSubmit}
        setThemeInput={setTheme}
      />
    </aside>
  );
}

export default BarraLateralDireita;