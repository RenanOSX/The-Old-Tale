import React, { useEffect, useState } from 'react';

import ItensBarraEsquerda from '../ItensBarraEsquerda/ItensBarraEsquerda';

import './BarraLateralEsquerda.css';

import btn from '/assets/icons/button.png'

import dano from '/assets/icons/dano_icon.png';

import defesa from '/assets/icons/defesa_icon.png';

import agilidade from '/assets/icons/agilidade_icon.png';

import vida from '/assets/icons/heart.png';

const sidebarItems = [
  { icon: dano, text: "Dano" },
  { icon: defesa, text: "Defesa" },
  { icon: agilidade, text: "Agilidade" },
  { icon: vida, text: "Vida" },
];

function BarraLateralEsquerda({color}) {
  
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const subtleColor = hexToRgba(color, 0.5);

  return (
    <aside className="sidebar" style={{ background: `linear-gradient(180deg, #070707 99%,  ${subtleColor} 100%)` }}>
      <div className="sidebar-section-combat" >
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
