import React, { useEffect, useState } from 'react';

import './BarraLateralDireita.css'

import yinYangBtn from '../../assets/icons/yin_yang_button.png'

import arrowDown from '../../assets/icons/arrow_down.png'

import JogadorInfo from '../JogadorInfo/JogadorInfo';

function BarraLateralDireita({ player }) {
  

  return (
    <aside className="stats-info">
      <div className='title-gerar-mundo'>
        "GERE UM NOVO MUNDO"
      </div>
        
      <img src={arrowDown} className='arrow-down' alt="Arrow Down"/>

      <img src={yinYangBtn} className='arrow-down' alt="Yin Yang Button"/>

      <div className="money-right">
        200 GC
      </div>
    
      <JogadorInfo jogador={player} />
    </aside>
  );
}

export default BarraLateralDireita;