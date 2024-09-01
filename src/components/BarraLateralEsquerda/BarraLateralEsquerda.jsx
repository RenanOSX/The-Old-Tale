import React, { useEffect, useState } from 'react';
import ItensBarraEsquerda from '../ItensBarraEsquerda/ItensBarraEsquerda';
import './BarraLateralEsquerda.css';
import magicWand from '../../assets/magic_wand.png';
import euro from '../../assets/euro_icon.png'
import ataque from '../../assets/ata.png'
import foco from '../../assets/foc.png'
import agilidade from '../../assets/agi.png'
import forca from '../../assets/for.png'
import defesa from '../../assets/def.png'

const sidebarItems = [
  { icon: ataque, text: "Ataque" },
  { icon: foco, text: "Foco" },
  { icon: agilidade, text: "Agilidade" },
  { icon: forca, text: "Força" },
  { icon: defesa, text: "Defesa" }
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
        <header className="sidebar-header">
          <img loading="lazy" src={magicWand} alt="" />
          <div className='sidebar-title'>Praecantatio Idle</div>
        </header>
        <nav className="sidebar-nav">
          <div className="sidebar-version">ALPHA VERSION 0.1</div>
          <div className="sidebar-wallet">
            <img className='euro-icon' src={euro}/>
            <div className="text-white">Carteira</div>
            <div className="text-amber">{currentMoney} GC</div>
          </div>
          <div className="sidebar-section">COMBAT</div>
          {sidebarItems.map((item, index) => (
            <ItensBarraEsquerda key={index} icon={item.icon} text={item.text} />
          ))}
          <div className="sidebar-section">SKILLS</div>
        </nav>
    </aside>
  );
}

export default BarraLateralEsquerda;
