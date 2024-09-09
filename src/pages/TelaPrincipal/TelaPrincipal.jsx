import React from 'react';

import Header from '../../components/Header/Header';

import AuthServices from '../../services/AuthServices';

import BarraLateralEsquerda from '../../components/BarraLateralEsquerda/BarraLateralEsquerda';

import ComponenteCentral from '../../components/ComponenteCentral/ComponenteCentral';

import BarraLateralDireita from '../../components/BarraLateralDireita/BarraLateralDireita';

import { useState, useEffect } from 'react';

import MonsterService from '../../services/monsterService.js';

import PlayerService from '../../services/PlayerService';

import Player from '../../models/Player.js';

import './TelaPrincipal.css';

const TelaPrincipal = () => {
  const [monsters, setMonsters] = useState([]);

  const [user, setUser] = useState(null);

  const [player, setPlayer] = useState(null);
  
  const [loading, setLoading] = useState(true);
  
  const [loadingMonsters, setLoadingMonsters] = useState([]);

  useEffect(() => {
    const initializeData = async () => {
      const currentUser = await AuthServices.getCurrentUser();
      
      setUser(currentUser);
      
      const fetchedMonsters = await MonsterService.buscaMonstros();

      setMonsters(fetchedMonsters);

      if (currentUser) {
        const fetchedPlayerData = await PlayerService.buscaJogador(currentUser.displayName);
        setPlayer(fetchedPlayerData);
      }

      setLoading(false);
    }; 

    initializeData();
  }, []);

  const handleMonsterUpdate = async (index, raridade) => {
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

      const updatedPlayer = new Player(player._name, player._money, player._xp, player._xpToNextLevel, player._level, player._vida, player._dano, player._defesa, player._agilidade);

      updatedPlayer.addXP(raridade)

      updatedPlayer.earnMoney(1)

      setPlayer(updatedPlayer);

      localStorage.setItem('player', JSON.stringify(updatedPlayer));
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

  const [color, setColor] = useState('');

  const handleSubmit = async (event, {theme}) => {
    event.preventDefault();
    const color = await MonsterService.changeTheme(theme);
    if (color) {
      setColor(color);
      console.log(`Received color: ${color}`);
    } else {
      console.error('Failed to receive a valid color from the API');
    }
  };

  if (loading) {
    return (
      <div className='carregamento'>
        Loading...
      </div>
    );
  }

  return (
    <div className="first-screen">
      <Header user={user} color={color}/>
      <div className="layout-container">
        <BarraLateralEsquerda player={player} />
        <ComponenteCentral
          monsters={monsters}
          player={player}
          loadingMonsters={loadingMonsters}
          onMonsterUpdate={handleMonsterUpdate}
        />
        <BarraLateralDireita player={player}  handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
}

export default TelaPrincipal;