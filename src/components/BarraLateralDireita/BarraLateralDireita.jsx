import React, { useEffect, useState } from 'react';

import './BarraLateralDireita.css'

import yinYangBtn from '../../assets/icons/yin_yang_button.png'

import arrowDown from '../../assets/icons/arrow_down.png'

import JogadorInfo from '../JogadorInfo/JogadorInfo';

function BarraLateralDireita({ player, handleSubmit }) {
  const [theme, setTheme] = useState('');

  const handleInputChange = (event) => {
    setTheme(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(event, { theme });
  };

  return (
    <aside className="stats-info">
      <div className='title-gerar-mundo'>
        "GERE UM NOVO TEMA"
      </div>
        
      <img src={arrowDown} className='arrow-down' alt="Arrow Down"/>

      {/* <img src={yinYangBtn} className='arrow-down' alt="Yin Yang Button"/> */}
      <form onSubmit={handleFormSubmit}>
          <input 
            className='theme-input'
            type="text" 
            id="theme-input" 
            placeholder="EX: Inferno" 
            value={theme} 
            onChange={handleInputChange} 
          />
          <button 
          type="submit"
          className='theme-button'>
            Mudar</button>
        </form>

      <div className="money-right">
        200 GC
      </div>
    
      <JogadorInfo jogador={player} />
    </aside>
  );
}

export default BarraLateralDireita;