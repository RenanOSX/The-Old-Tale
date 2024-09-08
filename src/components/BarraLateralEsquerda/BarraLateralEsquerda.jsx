import React, { useEffect, useState } from 'react';

import ItensBarraEsquerda from '../ItensBarraEsquerda/ItensBarraEsquerda';

import './BarraLateralEsquerda.css';

import btn from '../../assets/icons/button.png'

import dano from '../../assets/icons/dano_icon.png';

import defesa from '../../assets/icons/defesa_icon.png';

import agilidade from '../../assets/icons/agilidade_icon.png';

const sidebarItems = [
  { icon: dano, text: "Dano" },
  { icon: defesa, text: "Defesa" },
  { icon: agilidade, text: "Agilidade" }
];

function BarraLateralEsquerda() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section-combat">
        COMBAT
      </div>
      
      {sidebarItems.map((item, index) => (
        <ItensBarraEsquerda key={index} icon={item.icon} text={item.text} />
      ))}

      <div className='sidebar-section'>
        SORTEAR MONSTROS
      </div>

      <img src={btn} alt='button' className='btn' />

      <div className="sidebar-section-money">
        {3} GC
      </div>

      <div className='version'>
        ALPHA VERSION 0.1
      </div>
    </aside>
  );
}

export default BarraLateralEsquerda;
