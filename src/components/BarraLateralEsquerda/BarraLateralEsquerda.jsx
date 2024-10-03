import React, { useEffect, useState } from 'react';

import { useSpring, animated } from '@react-spring/web';

import ItensBarraEsquerda from '../ItensBarraEsquerda/ItensBarraEsquerda';

import './BarraLateralEsquerda.css';

import btn from '/assets/icons/button.png'

import dano from '/assets/icons/dano_icon.png';

import defesa from '/assets/icons/defesa_icon.png';

import agilidade from '/assets/icons/agilidade_icon.png';

import vida from '/assets/icons/heart.png';

import Player from '../../models/Player';

import MonsterService from '../../services/MonsterService';

import AuthServices from '../../services/AuthServices';

import PlayerService from '../../services/PlayerService';

const sidebarItems = [
  { icon: dano, text: "Dano" },
  { icon: defesa, text: "Defesa" },
  { icon: agilidade, text: "Agilidade" },
  { icon: vida, text: "Vida" },
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

  const handleButtonClick = async () => {
    if (currentPlayer._money >= 3) {
      try {
        currentPlayer.earnMoney(-3)

        await PlayerService.salvaJogador(userId, currentPlayer);

        const userTheme = AuthServices.buscarTheme(userId)

        await MonsterService.resetMonsters(userId, userTheme)
      } catch (error) {
        console.error('Erro ao sortear monstros:', error);
      }
    
    } else {
      setErrorMessage('Moedas insuficientes');
      setTimeout(() => setErrorMessage(''), 3000); // Remove a mensagem após 3 segundos
    }
  };


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

      <div className='sidebar-section'>
        SORTEAR MONSTROS
      </div>

      <div className='btn-container'>
        <img onClick={handleButtonClick} src={btn} alt='button' className='btn' style={{ backgroundColor: color }} />
      </div>

      <div className="sidebar-section-money">
        {3} GC
      </div>

      <animated.div style={errorAnimation} className="error-message">
        {errorMessage}
      </animated.div>

      <div className='version'>
        ALPHA VERSION 0.1
      </div>
    </aside>
  );
}

export default BarraLateralEsquerda;
