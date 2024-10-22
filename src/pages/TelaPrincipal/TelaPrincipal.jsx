import React, { useContext } from 'react';

import Header from '../../components/Header/Header';

import BarraLateralEsquerda from '../../components/BarraLateralEsquerda/BarraLateralEsquerda';

import ComponenteCentral from '../../components/ComponenteCentral/ComponenteCentral';

import BarraLateralDireita from '../../components/BarraLateralDireita/BarraLateralDireita';

import VisualNovelIntro from '../../components/VisualNovelIntro/VisualNovelIntro.jsx';

import './TelaPrincipal.css';

import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';

import { GameContext } from '../../context/GameContext.jsx';

import { AuthContext } from '../../context/AuthContext.jsx';

const TelaPrincipal = () => {

  const {
    setShowIntroduction,
    loading,
    showIntroduction,
    introduction,
    handleMonsterUpdate,
    currentLog
  } = useContext(GameContext)

  console.log('EU QUERO VER: ', loading)

  const {
    user
  } = useContext(AuthContext)

  if (loading) {
    return <LoadingScreen currentLog={currentLog} />;
  }

  // if (showIntroduction) {
  //   return <IntroductionScreen introduction={introduction} onProceed={handleProceed} />;
  // }

  const handleCloseIntroduction = () => {
    setShowIntroduction(false);
  };

  return (
    <div className="first-screen">
      {showIntroduction && <VisualNovelIntro introduction={introduction} onClose={handleCloseIntroduction} />}
      <Header user={user}/>
      <div className="layout-container">
        <BarraLateralEsquerda userId={user.uid}/>
        <ComponenteCentral onMonsterUpdate={handleMonsterUpdate}
        />
        <BarraLateralDireita/>
      </div>
    </div>
  );
}

export default TelaPrincipal;