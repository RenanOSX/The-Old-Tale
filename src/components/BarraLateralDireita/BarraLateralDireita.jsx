import React, { useEffect } from 'react';

import './BarraLateralDireita.css'

import yinYangBtn from '../../assets/icons/yin_yang_button.png'

import arrowDown from '../../assets/icons/arrow_down.png'

import circleImpermanence from '../../assets/icons/circle_impermanence.png'

import euro from '../../assets/icons/euro_icon.png'

function BarraLateralDireita() {

  const [player, setPlayer] = React.useState(localStorage.getItem('player'))

  useEffect(() => {
    const player = JSON.parse(localStorage.getItem('player'))
    setPlayer(player)
  }, [])

  return (
    <aside className="stats-info">
      <div className='title-gerar-mundo'>
        "GERE UM NOVO MUNDO"
      </div>
        
      <img src={arrowDown} className='arrow-down'/>

      <img src={yinYangBtn} className='arrow-down'/>

      <div className="money-right">
        200 GC
      </div>

      <div className='group-profile'>
        <img src={circleImpermanence} className='circle-impermanence'/>
        <div className='profile-name'>
          JOGADOR
        </div>
      </div>

      <div className="atributos-player">
        Nível - {player._level}
        <br/>
        <br/>
        XP - {player._xp}
        <br/>
        <br/>
        XP para o próximo nível - {player._xpToNextLevel}
      </div>

      <div className="carteira">
        <img src={euro}/>
        {player._money} GC
      </div>
      
    </aside>
  );
}

export default BarraLateralDireita;
