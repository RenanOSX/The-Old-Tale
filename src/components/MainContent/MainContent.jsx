import React, { useState, useEffect } from 'react';
import './MainContent.css';
import Terminal from '../Terminal/Terminal';
import MonsterComponent from '../Monster/Monster';
import Monster from '../../models/Monster.js';
import Player from '../../models/Player.js';
import btn from '../../assets/btn.png';

function MainContent() {
  const [monsters, setMonsters] = useState([]);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Verifica se já existem monstros armazenados no localStorage
    const storedMonsters = localStorage.getItem('monsters');
    if (storedMonsters) {
      setMonsters(JSON.parse(storedMonsters));
    } else {
      const newMonsters = [];
      for (let i = 0; i < 3; i++) {
        const newMonster = Monster.createNew(); // Cria um monstro novo
        newMonsters.push(newMonster);
      }
      setMonsters(newMonsters);
      localStorage.setItem('monsters', JSON.stringify(newMonsters));
    }

    // Verifica se o player já existe no localStorage
    const storedPlayer = localStorage.getItem('player');
    if (storedPlayer) {
      setPlayer(JSON.parse(storedPlayer));
    } else {
      // Cria um novo jogador se não existir
      const newPlayer = new Player(); // Exemplo de criação de um jogador
      setPlayer(newPlayer);
      localStorage.setItem('player', JSON.stringify(newPlayer));
    }
  }, []);

  const handleMonsterUpdate = (index) => {
    const newMonsters = [...monsters];
  
    newMonsters[index] = Monster.createNew(); // Generate a completely new monster

    setMonsters(newMonsters);
    localStorage.setItem('monsters', JSON.stringify(newMonsters));
  };


  return (
    <main className="main-content">
      <header className="main-header">
        <div className='header-title'>
          0%
        </div>
      </header>
      <div className='content'>
        <div className="main-section-content">
          {monsters.map((monster, index) => (
            <MonsterComponent
              key={index}
              monster={monster}
              player={player}
              index={index}
              onMonsterUpdate={handleMonsterUpdate}
            />
          ))}
        </div>

        <div className='section-buttons'>
          {monsters.map((monster, index) => (
            <img key={index} src={btn} alt='Attack' className="attack-button" />
          ))}
        </div>
  
        <div className="logs-content">
          <Terminal />
        </div>
  
      </div>
    </main>
  );
}

export default MainContent;