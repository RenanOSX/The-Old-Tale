import React, { useState, useEffect } from 'react';

import './ComponenteCentral.css';

import Terminal from '../Terminal/Terminal.jsx';

import ComponenteMonstro from '../ComponenteMonstro/Monstro.jsx';

import placeHolder from '/public/assets/images/monster.png';

function ComponenteCentral({ monsters, player, loadingMonsters, onMonsterUpdate }) {

  const borderColor = "transparent";

  const placeHolderStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transform: 'scale(1)',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px'
  };

  return (
    <main className="main-content">
      <div className='content'>
        <div className="main-section-content">
          {monsters.map((monster, index) => (
            loadingMonsters[index] ? (
              <div key={index} className="monster-container">
                <div class="monster-box" style={placeHolderStyle}>
                    <div class="monster-name">
                      <h1>‎</h1>
                    </div>
                    <img src={placeHolder}/>
                    <h1 id="monsterhp">Loading...</h1>
                  </div>
                </div>
            ) : (
              <ComponenteMonstro
                key={index}
                monster={monster}
                player={player}
                index={index}
                onMonsterUpdate={onMonsterUpdate}
              />
            )
          ))}
        </div>
        <div className="logs-content">
          <Terminal />
        </div>
      </div>
    </main>
  );
}

export default ComponenteCentral;