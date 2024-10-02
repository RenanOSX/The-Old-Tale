import React, { createContext, useState, useEffect } from 'react';

import AuthServices from '../services/AuthServices';

import MonsterService from '../services/MonsterService';

import PlayerService from '../services/PlayerService';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('');
  const [color, setColor] = useState({});
  const [monsters, setMonsters] = useState([]);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMonsters, setLoadingMonsters] = useState([]);

  useEffect(() => {
    const currentUser = AuthServices.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      fetchData(currentUser);
    }
  }, []);

  const fetchData = async (currentUser) => {
    try {
      setLoading(true);
      const firebaseTheme = await AuthServices.buscarTheme(currentUser.uid);
      const color = await AuthServices.buscarColor(currentUser.uid);
      console.log('Fetched color: ', color);
      setTheme(firebaseTheme);
      setColor(color);
      const fetchedMonsters = await MonsterService.buscaMonstros(currentUser.uid, firebaseTheme);
      setMonsters(fetchedMonsters);
      const fetchedPlayer = await PlayerService.buscaJogador(currentUser.uid);
      setPlayer(fetchedPlayer);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setLoading(false);
    }
  };

  console.log('GameContext:', { user, theme, color, monsters, player, loading, loadingMonsters });

  return (
    <GameContext.Provider value={{
      user, theme, color, monsters, player, loading, loadingMonsters,
      setTheme, setColor, setMonsters, setPlayer, setLoading, setLoadingMonsters
    }}>
      {children}
    </GameContext.Provider>
  );
};