import React from 'react';

import Header from '../../components/Header/Header';

import AuthServices from '../../services/AuthServices';

import BarraLateralEsquerda from '../../components/BarraLateralEsquerda/BarraLateralEsquerda';

import ComponenteCentral from '../../components/ComponenteCentral/ComponenteCentral';

import BarraLateralDireita from '../../components/BarraLateralDireita/BarraLateralDireita';

import { useState, useEffect } from 'react';

import MonsterService from '../../services/MonsterService.js';

import PlayerService from '../../services/PlayerService';

import IntroductionScreen from '../IntroductionScreen/IntroductionScreen.jsx';

import Player from '../../models/Player.js';

import './TelaPrincipal.css';

import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';

import GameplayService from '../../services/GameplayService.js';

const TelaPrincipal = () => {

  const [monsters, setMonsters] = useState([]);

  const [theme, setTheme] = useState('');

  const [user, setUser] = useState(null);

  const [player, setPlayer] = useState(null);
  
  const [loading, setLoading] = useState(true);
  
  const [loadingMonsters, setLoadingMonsters] = useState([]);

  const [color, setColor] = useState('');

  const [currentLog, setCurrentLog] = useState('');

  const [logs, setLogs] = useState([]);

  const [showIntroduction, setShowIntroduction] = useState(false);

  const [introduction, setIntroduction] = useState('');

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true); 
  
        const currentUser = await AuthServices.getCurrentUser();

        setUser(currentUser);
        
        if (currentUser) {
          setCurrentLog('Buscando temas...');
          const userTheme = theme !== '' ? theme : await AuthServices.buscarTheme(currentUser.uid);

          setTheme(userTheme);

          const firebaseTheme = await AuthServices.buscarTheme(currentUser.uid);

          const color = await AuthServices.buscarColor(currentUser.uid);

          if (firebaseTheme !== userTheme) {
            currentUser.theme = theme;
            currentUser.color = await GameplayService.changeTheme(theme);
            await AuthServices.updateUser(currentUser);
          }
          
          console.log(color)
          
          if (color) {
            setColor(color);
            console.log(`Received color: ${color}`);
          } else {
            console.error('Failed to receive a valid color from the API');
          }
          
          setCurrentLog('Tema carregado.');
  
          setCurrentLog('Buscando monstros...');
          const fetchedMonsters = await MonsterService.buscaMonstros(currentUser.uid, userTheme);
          setMonsters(fetchedMonsters);
          setLogs((prevLogs) => [...prevLogs, 'Monstros carregados.']);
  
          setCurrentLog('Buscando dados do jogador...');
          const fetchedPlayerData = await PlayerService.buscaJogador(currentUser.uid);
          setPlayer(fetchedPlayerData);
          setLogs((prevLogs) => [...prevLogs, 'Dados do jogador carregados.']);

          const introductionShown = localStorage.getItem('introductionShown');
          console.log('IntroductionShown: ' + introductionShown, 'userTheme: ' + userTheme);
          if (!introductionShown || introductionShown == null) {
            setCurrentLog('Gerando introdução...');
            const intro = await GameplayService.geraHistoria(userTheme, 'introducao');
            setIntroduction(intro);
            setShowIntroduction(true);
            localStorage.setItem('introductionShown', 'true');
          }
        } else {
          setCurrentLog('Usuário não autenticado.');
        }
      } catch (error) {
        console.error('Erro ao inicializar dados:', error);
        setCurrentLog('Erro ao carregar dados.');
        setLogs((prevLogs) => [...prevLogs, `Erro: ${error.message}`]);
      } finally {
        setLoading(false);  
      }
    };
  
    initializeData();
  }, [theme]); 

  const handleMonsterUpdate = async (index, raridade) => {
    setLoadingMonsters((prev) => {
      const newLoadingMonsters = [...prev];

      newLoadingMonsters[index] = true;

      return newLoadingMonsters;
    });

    try {
      const name = await MonsterService.buscaNomeMonstro(theme);

      const newMonster = await MonsterService.criaMonstro(name);

      await MonsterService.criaImagem(theme, index);

      const newMonsters = [...monsters];

      newMonsters[index] = newMonster;

      setMonsters(newMonsters);

      const updatedPlayer = new Player(player._name, player._money, player._xp, player._xpToNextLevel, player._level, player._vida, player._dano, player._defesa, player._agilidade);

      updatedPlayer.addXP(raridade)

      updatedPlayer.earnMoney(1)

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

  const handleProceed = () => {
    setShowIntroduction(false);
  };

  if (loading) {
    return <LoadingScreen logs={logs} currentLog={currentLog} />;
  }

  if (showIntroduction) {
    return <IntroductionScreen introduction={introduction} onProceed={handleProceed} />;
  }

  return (
    <div className="first-screen">
      <Header user={user} textColor={color.textColor} color={color.headerColor}/>
      <div className="layout-container">
        <BarraLateralEsquerda player={player} color={color.headerColor}/>
        <ComponenteCentral
          monsters={monsters}
          player={player}
          loadingMonsters={loadingMonsters}
          onMonsterUpdate={handleMonsterUpdate}
        />
        <BarraLateralDireita player={player} setTheme={setTheme} color={color.headerColor}/>
      </div>
    </div>
  );
}

export default TelaPrincipal;