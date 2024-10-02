import React, { useEffect, useState } from 'react';

import './JogadorInfo.css';

import circleImpermanence from '/assets/icons/circle_impermanence.png';

import euro from '/assets/icons/euro_icon.png';

import Player from '../../models/Player';

import level01 from '/assets/icons/level01.png';

import level02 from '/assets/icons/level02.png';

import level03 from '/assets/icons/level03.png';

import level04 from '/assets/icons/level04.png';

import level05 from '/assets/icons/level05.png';

import level06 from '/assets/icons/level06.png';

import level07 from '/assets/icons/level07.png';

import level08 from '/assets/icons/level08.png';

import level09 from '/assets/icons/level09.png';

import level10 from '/assets/icons/level10.png';

const JogadorInfo = ({ jogador }) => {
  const levels = [
    { icon: level01, text: "Level 01" },
    { icon: level02, text: "Level 02" },
    { icon: level03, text: "Level 03" },
    { icon: level04, text: "Level 04" },
    { icon: level05, text: "Level 05" },
    { icon: level06, text: "Level 06" },
    { icon: level07, text: "Level 07" },
    { icon: level08, text: "Level 08" },
    { icon: level09, text: "Level 09" },
    { icon: level10, text: "Level 10" },
  ];
  if (!jogador) {
    return <div style={{alignSelf:'center'}}>No player data available</div>;
  }

  const [currentPlayer, setCurrentPlayer] = useState(new Player(jogador._name,  jogador._money,  jogador._xp, jogador._xpToNextLevel, jogador._level, jogador._dano, jogador._defesa, jogador._agilidade));

  const xpPercentage = (currentPlayer._xp / currentPlayer._xpToNextLevel) * 100;

  useEffect(() => {
    setCurrentPlayer(new Player(jogador._name,  jogador._money,  jogador._xp, jogador._xpToNextLevel, jogador._level, jogador._dano, jogador._defesa, jogador._agilidade));
  }, [jogador]);

  return (
    <div>
      <div className='group-profile'>
        <img src={circleImpermanence} className='circle-impermanence' alt="Circle Impermanence"/>
        <div className='profile-name'>
          Jogador
        </div>
      </div>

      <div className="atributos-player">
        <div className="xp-bar-container">
          <div className="xp-bar" style={{ width: `${xpPercentage}%` }}></div>
        </div>
        <div className="xp-text">
          XP - {currentPlayer._xp} / {currentPlayer._xpToNextLevel}
        </div>
  
      </div>

      <div className="level-icons">
          {levels.map((level, index) => (
            <div key={index + 1} className="level-icon">
              {
                currentPlayer._level === index + 1
                  ?  [
                    <React.Fragment key={index}>
                      <img src={level.icon} alt={level.text} />
                      <p>{level.text}</p>
                    </React.Fragment>
                  ] : null
              }
            </div>
          ))}
        </div>

        <div className="carteira">
          <img src={euro} alt="Euro"/>
          {currentPlayer._money} GC
        </div>
    </div>
  );
}

export default JogadorInfo;