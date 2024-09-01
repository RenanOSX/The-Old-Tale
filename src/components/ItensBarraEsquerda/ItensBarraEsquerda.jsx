import React from 'react';
import './ItensBarraEsquerda.css';

function ItensBarraEsquerda({ icon, text }) {
  return (
    <div className="sidebar-item">
      <img loading="lazy" src={icon} alt="" className="sidebar-item-icon" />
      <div className="sidebar-item-text">{text}</div>
    </div>
  );
}

export default ItensBarraEsquerda;
