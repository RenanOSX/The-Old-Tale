import React, { useEffect, useState } from 'react';

import './BarraLateralDireita.css'

import yinYangBtn from '../../assets/icons/yin_yang_button.png'

import arrowDown from '../../assets/icons/arrow_down.png'

import JogadorInfo from '../JogadorInfo/JogadorInfo';

import Popup from '../PopUpInputTheme.jsx/PopUpInputTheme';

function BarraLateralDireita({ player, setTheme, color }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleYinYangClick = () => {
    setIsPopupVisible(true); // Mostrar o pop-up quando o botão Yin Yang for clicado
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false); // Ocultar o pop-up
  };

  const handleFormSubmit = () => {
    setIsPopupVisible(false); // Ocultar o pop-up após o envio do formulário
  };

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

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