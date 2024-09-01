import React from 'react';
import BarraLateralEsquerda from '../../components/BarraLateralEsquerda/BarraLateralEsquerda';
import ComponenteCentral from '../../components/ComponenteCentral/ComponenteCentral';
import BarraLateralDireita from '../../components/BarraLateralDireita/BarraLateralDireita';
import './TelaPrincipal.css';

function TelaPrincipal() {
  return (
    <div className="first-screen">
      <div className="layout-container">
        <BarraLateralEsquerda />
        <ComponenteCentral />
        <BarraLateralDireita />
      </div>
    </div>
  );
}

export default TelaPrincipal;
