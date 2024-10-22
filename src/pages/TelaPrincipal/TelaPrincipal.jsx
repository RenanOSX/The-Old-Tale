import React, { useContext } from 'react';

import Header from '../../components/Header/Header';

import BarraLateralEsquerda from '../../components/BarraLateralEsquerda/BarraLateralEsquerda';

import ComponenteCentral from '../../components/ComponenteCentral/ComponenteCentral';

import BarraLateralDireita from '../../components/BarraLateralDireita/BarraLateralDireita';

import VisualNovelIntro from '../../components/VisualNovelIntro/VisualNovelIntro.jsx';

import './TelaPrincipal.css';

import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';

import { GameContext } from '../../context/GameContext.jsx';

const TelaPrincipal = () => {

  const {
    setShowIntroduction,
    loading,
    showIntroduction,
    introduction,
    color,
    user,
    handleMonsterUpdate,
    currentLog
  } = useContext(GameContext)

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
      <Header user={user} textColor={color.textColor} color={color.headerColor}/>
      <div className="layout-container">
        <BarraLateralEsquerda userId={user.uid} color={color.headerColor}/>
        <ComponenteCentral onMonsterUpdate={handleMonsterUpdate}
        />
        <BarraLateralDireita color={color.headerColor}/>
      </div>
    </div>
  );
}

export default TelaPrincipal;