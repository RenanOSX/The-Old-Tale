import React, { useState, useEffect } from 'react';

import './ComponenteCentral.css';

import Terminal from '../Terminal/Terminal.jsx';

import ComponenteMonstro from '../ComponenteMonstro/Monstro.jsx';

import MonsterService from '../../services/monsterService.js';

function ComponenteCentral() {
  const [monsters, setMonsters] = useState([]);

  const [player, setPlayer] = useState(null);
  
  const [loadingMonsters, setLoadingMonsters] = useState([]);

  useEffect(() => {
    const initializeData = async () => {
      const fetchedMonsters = await MonsterService.buscaMonstros();
      setMonsters(fetchedMonsters);

      const fetchedPlayer = MonsterService.buscaJogador();
      setPlayer(fetchedPlayer);
    };

    initializeData();
  }, []);

  const handleMonsterUpdate = async (index) => {
    setLoadingMonsters((prev) => {
      const newLoadingMonsters = [...prev];
      newLoadingMonsters[index] = true;
      return newLoadingMonsters;
    });

    try {
      const name = await MonsterService.buscaNomeMonstro();
      const newMonster = await MonsterService.criaMonstro(name);

      const newMonsters = [...monsters];
      newMonsters[index] = newMonster;
      setMonsters(newMonsters);

      localStorage.setItem('monsters', JSON.stringify(newMonsters));
    } catch (error) {
      console.error('Erro ao atualizar o monstro:', error);
    } finally {
      setLoadingMonsters((prev) => {
        const newLoadingMonsters = [...prev];
        newLoadingMonsters[index] = false;
        return newLoadingMonsters;
      });
    }
  };

  return (
    <main className="main-content">
      <div className='content'>
        <div className="main-section-content">
          {monsters.map((monster, index) => (
            loadingMonsters[index] ? (
              <div key={index}>Loading...</div>
            ) : (
              <ComponenteMonstro
                key={index}
                monster={monster}
                player={player}
                index={index}
                onMonsterUpdate={handleMonsterUpdate}
              />
            )
          ))}
        </div>

        <div className="logs-content">
          <Terminal />
        </div>

      </div>
    </main>
  );
}

export default ComponenteCentral;