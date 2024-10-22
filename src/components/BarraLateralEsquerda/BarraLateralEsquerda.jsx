import React, { useContext, useState } from 'react';

import ItensBarraEsquerda from '../ItensBarraEsquerda/ItensBarraEsquerda';

import './BarraLateralEsquerda.css';

import dano from '/assets/icons/dano_icon.png';

import agilidade from '/assets/icons/agilidade_icon.png';

import { GameContext } from '../../context/GameContext';

import karmalumia from '/assets/images/karma-lumia.png';

function BarraLateralEsquerda({ color }) {
  const {showIntroduction, currentRegion} = useContext(GameContext)
  const sidebarItems = [
    { icon: dano, text: "Dano", attribute:'_dano' },
    { icon: agilidade, text: "Agilidade", attribute:'_agilidade' },
  ];

  return (
    <aside className="sidebar">    
      {sidebarItems.map((item, index) => (
        <ItensBarraEsquerda key={index} attribute={item.attribute}  maxAttribute={10} icon={item.icon} text={item.text} />
      ))}
      { 
        showIntroduction == false ?
        [
          <div key='npc-image' className="npc-image-esquerda">
            <img src={karmalumia} alt="NPC" />
          </div>,
          <div key='region-title' className='region-title'>
            {`Região ${currentRegion}`}
          </div>
        ] : null
      }
    </aside>
  );
}

export default BarraLateralEsquerda;
