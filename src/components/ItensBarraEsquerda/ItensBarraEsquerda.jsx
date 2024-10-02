import React from 'react';

import iconPlus from '/assets/icons/icon_plus.png';

import './ItensBarraEsquerda.css';

function ItensBarraEsquerda({ icon, text }) {
  return (
    <div className='container'>
      <div className='atributos'>1/10</div>
      <div className="sidebar-item">
        <img loading="lazy" src={icon} alt="" className="sidebar-item-icon" />
        <div className="overlap-group">
          {text}
        </div>
        <img loading="lazy" src={iconPlus} alt="" className="sidebar-item-icon" />
      </div>
    </div>
  );
}

export default ItensBarraEsquerda;
