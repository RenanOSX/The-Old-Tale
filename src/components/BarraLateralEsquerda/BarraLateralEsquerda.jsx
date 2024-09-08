import React, { useEffect, useState } from 'react';

import ItensBarraEsquerda from '../ItensBarraEsquerda/ItensBarraEsquerda';

import './BarraLateralEsquerda.css';

import dano from '../../assets/icons/dano_icon.png';

import defesa from '../../assets/icons/defesa_icon.png';

import agilidade from '../../assets/icons/agilidade_icon.png';

const sidebarItems = [
  { icon: dano, text: "Dano" },
  { icon: defesa, text: "Defesa" },
  { icon: agilidade, text: "Agilidade" }
];


function BarraLateralEsquerda() {
  const [currentMoney, setCurrentMoney] = useState(localStorage.getItem('Money'));

  useEffect(() => {
    const handleMoneyUpdate = (event) => {
      setCurrentMoney(event.detail);
    };

    // Adiciona o listener para o evento customizado
    window.addEventListener('moneyUpdated', handleMoneyUpdate);

    // Remove o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('moneyUpdated', handleMoneyUpdate);
    };
  }, []);
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        COMBAT
      </div>
      
      {sidebarItems.map((item, index) => (
        <ItensBarraEsquerda key={index} icon={item.icon} text={item.text} />
      ))}
    </aside>
  );
}

export default BarraLateralEsquerda;
