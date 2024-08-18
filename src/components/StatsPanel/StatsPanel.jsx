import React from 'react';
import './StatsPanel.css';
import signal from '../../assets/signal.png'
import card from '../../assets/card.png'

function StatsPanel() {
  return (
    <aside className="stats-info">
        <header className="stats-info-header">
          <img src={signal}/>
          <div className='stats-title'>
            Estatísticas e <br /> Infos
          </div>
        </header>
        <div className="stats-info-content">
          <p>
            Dano p/ segundo <span className="text-red-500">0hp</span>
          </p>
          <p>
            Acerto crítico <span className="text-red-500">15%</span>
          </p>
          <p>
            Chances de vitória atual <span className="text-red-500">15%</span>
          </p>
          <p>
            Tema atual <span className="text-red-500">Terror</span>
          </p>
          <p>Nível de experiência 10</p>
          <p>Ofício Mago</p>
        </div>
        <header className="stats-info-shop">
          <img src={card}/>
          <div className='stats-title'>
            Loja
          </div>
        </header>
        
    </aside>
  );
}

export default StatsPanel;
