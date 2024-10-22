// src/context/GameContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import AuthServices from '../services/AuthServices';
import MonsterService from '../services/MonsterService';
import PlayerService from '../services/PlayerService';
import GameplayService from '../services/GameplayService';
import Player from '../models/Player';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [monsters, setMonsters] = useState([]);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('');
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMonsters, setLoadingMonsters] = useState([]);
  const [color, setColor] = useState('');
  const [currentLog, setCurrentLog] = useState('');
  const [showIntroduction, setShowIntroduction] = useState(false);
  const [introduction, setIntroduction] = useState('');
  const [currentRegion, setCurrentRegion] = useState(1);

  const initializeData = async () => {
    try {
      setLoading(true);

      const currentUser = await AuthServices.getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        setCurrentLog('Buscando temas...');
        const userTheme = await AuthServices.buscarTheme(currentUser.uid);

        setCurrentLog('Buscando cores...');
        const color = await AuthServices.buscarColor(currentUser.uid);

        if (color) {
          setColor(color);
          console.log(`Received color: ${color}`);
        } else {
          console.error('Failed to receive a valid color from the API');
        }

        setCurrentLog('Buscando monstros...');
        const fetchedMonsters = await MonsterService.buscaMonstros(currentUser.uid, userTheme);
        setMonsters(fetchedMonsters);

        setCurrentLog('Buscando dados do jogador...');
        const fetchedPlayerData = await PlayerService.buscaJogador(currentUser.uid);
        setPlayer(fetchedPlayerData);

        setCurrentLog('Buscando região atual...');
        const region = await GameplayService.buscaRegiaoAtual(currentUser.uid);
        setCurrentRegion(region);

        setCurrentLog('Gerando história...');
        const intro = await GameplayService.buscaHistoria(currentUser.uid, userTheme, `regiao${region}`);
        setIntroduction(intro);
        setShowIntroduction(true);

      } else {
        setCurrentLog('Usuário não autenticado.');
      }
    } catch (error) {
      console.error('Erro ao inicializar dados:', error);
      setCurrentLog('Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    const applyTheme = async () => {
      if (user && theme) {
        setLoading(true);
        try {
          const updatedColor = await GameplayService.changeTheme(theme);
          setColor(updatedColor);
          user.theme = theme;
          user.color = updatedColor;
          await AuthServices.updateUserInDatabase(user);

          // Redefine os monstros
          await MonsterService.resetMonsters(user.uid, theme);

          initializeData();
        } catch (error) {
          console.error('Erro ao aplicar tema:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    applyTheme();
  }, [theme]);

  const handleMonsterUpdate = async (index, raridade) => {
    setLoadingMonsters((prev) => {
      const newLoadingMonsters = [...prev];
      newLoadingMonsters[index] = true;
      return newLoadingMonsters;
    });

    try {
      const name = await MonsterService.buscaNomeMonstro(theme, user.uid);
      const newMonster = await MonsterService.criaMonstro(name);
      const userTheme = await AuthServices.buscarTheme(user.uid);
      await MonsterService.criaImagem(userTheme, index);

      const newMonsters = [...monsters];
      newMonsters[index] = newMonster;
      setMonsters(newMonsters);

      const updatedPlayer = new Player(player._name, player._money, player._xp, player._xpToNextLevel, player._level, player._dano, player._agilidade);
      updatedPlayer.addXP(raridade);
      updatedPlayer.earnMoney(1);
      console.log('Player:', updatedPlayer);
      setPlayer(updatedPlayer);

      if (user) {
        await MonsterService.salvaMonstros(user.uid, newMonsters);
        await PlayerService.salvaJogador(user.uid, updatedPlayer);
      }
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

  const updateRegion = async (newRegion) => {
    if (user) {
      try {
        await GameplayService.setRegiaoAtual(user.uid, newRegion);
        setCurrentRegion(newRegion);
        console.log(`Região atual definida para ${newRegion}`);
      } catch (error) {
        console.error('Erro ao atualizar a região:', error);
      }
    }
  };

  return (
    <GameContext.Provider
      value={{
        monsters,
        user,
        theme,
        player,
        loading,
        loadingMonsters,
        color,
        currentLog,
        showIntroduction,
        introduction,
        currentRegion,
        setTheme,
        handleMonsterUpdate,
        setShowIntroduction,
        setIntroduction,
        setLoading,
        setCurrentLog,
        setPlayer,
        setCurrentRegion, 
        updateRegion 
      }}
    >
      {children}
    </GameContext.Provider>
  );
};