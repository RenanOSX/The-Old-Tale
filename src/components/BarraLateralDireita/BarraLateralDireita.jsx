import React, { useEffect, useState } from 'react';

import './BarraLateralDireita.css'

import yinYangBtn from '../../assets/icons/yin_yang_button.png'

import arrowDown from '../../assets/icons/arrow_down.png'

import JogadorInfo from '../JogadorInfo/JogadorInfo';

import Popup from '../PopUpInputTheme.jsx/PopUpInputTheme';

function BarraLateralDireita({ player, setTheme }) {
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

  return (
    <aside className="stats-info">
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