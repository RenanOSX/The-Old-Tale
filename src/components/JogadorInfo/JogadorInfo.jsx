import React, { useEffect, useState } from 'react';
import './JogadorInfo.css';
import circleImpermanence from '../../assets/icons/circle_impermanence.png';
import euro from '../../assets/icons/euro_icon.png';
import Player from '../../models/Player';

const JogadorInfo = ({ jogador }) => {
  console.log(jogador);
  if (!jogador) {
    return <div style={{alignSelf:'center'}}>No player data available</div>;
  }

  const [currentPlayer, setCurrentPlayer] = useState(new Player(jogador._name,  jogador._money,  jogador._xp, jogador._xpToNextLevel, jogador._level, jogador._vida, jogador._dano, jogador._defesa, jogador._agilidade));

  useEffect(() => {
    setCurrentPlayer(new Player(jogador._name,  jogador._money,  jogador._xp, jogador._xpToNextLevel, jogador._level, jogador._vida, jogador._dano, jogador._defesa, jogador._agilidade));
  }, [jogador]);


  return (
    <div>
      <div className='group-profile'>
        <img src={circleImpermanence} className='circle-impermanence' alt="Circle Impermanence"/>
        <div className='profile-name'>
          JOGADOR
        </div>
      </div>

      <div className="atributos-player">
        Nível - {currentPlayer._level}
        <br/>
        <br/>
        XP - {currentPlayer._xp}
        <br/>
        <br/>
        XP para o próximo nível - {currentPlayer._xpToNextLevel}
      </div>

      <div className="carteira">
        <img src={euro} alt="Euro"/>
        {currentPlayer._money} GC
      </div>
    </div>
  );
}

export default JogadorInfo;