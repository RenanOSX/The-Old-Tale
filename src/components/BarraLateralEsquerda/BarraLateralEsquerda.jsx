import React, { useState } from 'react';

import { useSpring, animated } from '@react-spring/web';

import ItensBarraEsquerda from '../ItensBarraEsquerda/ItensBarraEsquerda';

import './BarraLateralEsquerda.css';

import dano from '/assets/icons/dano_icon.png';

import agilidade from '/assets/icons/agilidade_icon.png';

import Player from '../../models/Player';

const sidebarItems = [
  { icon: dano, text: "Dano" },
  { icon: agilidade, text: "Agilidade" },
];

function BarraLateralEsquerda({player, color, userId}) {
  const [errorMessage, setErrorMessage] = useState('');
  
  const [currentPlayer, setCurrentPlayer] = useState(new Player(player._name, player._money, player._xp, player._xpToNextLevel, player._level, player._dano, player._defesa, player._agilidade));

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const subtleColor = hexToRgba(color, 0.5);

  const errorAnimation = useSpring({
    opacity: errorMessage ? 1 : 0,
    transform: errorMessage ? 'translateY(0)' : 'translateY(-20px)',
    config: { duration: 300 },
  });

  return (
    <aside className="sidebar" style={{ background: `linear-gradient(180deg, #070707 99%,  ${subtleColor} 100%)` }}>
      <div className="sidebar-section-combat" >
        COMBAT
      </div>
      
      {sidebarItems.map((item, index) => (
        <ItensBarraEsquerda key={index} icon={item.icon} text={item.text} />
      ))}

      <animated.div style={errorAnimation} className="error-message">
        {errorMessage}
      </animated.div>
    </aside>
  );
}

export default BarraLateralEsquerda;
