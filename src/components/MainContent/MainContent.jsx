import React, { useState, useEffect } from 'react';
import './MainContent.css';
import Terminal from '../Terminal/Terminal';
import MonsterComponent from '../Monster/Monster';
import Monster from '../../models/Monster.js';
import Player from '../../models/Player.js';

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

  const handleMonsterUpdate = () => {
    const newMonsters = monsters.map(monster => {
      // Ensure monster is an instance of Monster
      const monsterInstance = monster instanceof Monster ? monster : new Monster(monster.name, monster.rarity, monster.level, monster.health, monster.maxHealth);
      console.log(monsterInstance)

      if (monsterInstance.isDead()) {
        return Monster.createNew(); // Generate a new monster at the same level
      } else {
          return monsterInstance;
      }
    });
  
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
              onMonsterUpdate={handleMonsterUpdate}
            />
          ))}
        </div>
        <section className="logs-section">
          <h2 className="logs-header">LOGS DE BATALHA</h2>
          <div className="logs-content">
            <Terminal />
          </div>
        </section>
      </div>
    </main>
  );
}

export default MainContent;
