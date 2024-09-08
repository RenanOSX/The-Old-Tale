import React, { useState, useEffect } from 'react';

import './ComponenteCentral.css';

import Terminal from '../Terminal/Terminal.jsx';

import ComponenteMonstro from '../ComponenteMonstro/Monstro.jsx';

function ComponenteCentral({ monsters, player, loadingMonsters, onMonsterUpdate }) {
  return (
    <main className="main-content">
      <div className='content'>
        <div className="main-section-content">
          {monsters.map((monster, index) => (
            loadingMonsters[index] ? (
              <div key={index}>Loading...</div>
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