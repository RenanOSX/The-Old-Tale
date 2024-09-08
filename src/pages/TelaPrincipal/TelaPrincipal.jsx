import React from 'react';

import Header from '../../components/Header/Header';

import BarraLateralEsquerda from '../../components/BarraLateralEsquerda/BarraLateralEsquerda';

import ComponenteCentral from '../../components/ComponenteCentral/ComponenteCentral';

import BarraLateralDireita from '../../components/BarraLateralDireita/BarraLateralDireita';

import './TelaPrincipal.css';

const TelaPrincipal = () => {
  return (
    <div className="first-screen">
      <Header/>
      <div className="layout-container">
        <BarraLateralEsquerda />
        <ComponenteCentral />
        <BarraLateralDireita />
      </div>
    </div>
  );
}

export default TelaPrincipal;
