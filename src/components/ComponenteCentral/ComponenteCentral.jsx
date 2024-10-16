import React, { useState } from 'react';

import './ComponenteCentral.css';

import { Tooltip as ReactTooltip } from 'react-tooltip'; // Correct import statement

import ComponenteMonstro from '../ComponenteMonstro/Monstro.jsx';

import placeHolder from '/public/assets/images/monster.png';

function ComponenteCentral({ monsters, player, loadingMonsters, onMonsterUpdate }) {

  const [items, setItems] = useState(Array(9).fill(null)); 

  const [selectedCells, setSelectedCells] = useState([]); // Estado para armazenar as células selecionadas

  const handleItemClick = (index) => {
    // Lógica para manipular o clique no item
    console.log(`Item na posição ${index} clicado`);

    setSelectedCells((prevSelectedCells) => {
      if (prevSelectedCells.includes(index)) {
        // Desmarcar célula se já estiver selecionada
        return prevSelectedCells.filter((cellIndex) => cellIndex !== index);
      } else if (prevSelectedCells.length < 3) {
        // Selecionar célula se menos de 3 células estiverem selecionadas
        return [...prevSelectedCells, index];
      } else {
        return prevSelectedCells;
      }
    });
  };

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
                <div className="monster-box" style={placeHolderStyle}>
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
          <div className="shelf">
          {items.map((item, index) => (
              <div
                key={index}
                className={`shelf-cell ${selectedCells.includes(index) ? 'selected' : ''}`}
                onClick={() => handleItemClick(index)}
                data-tooltip-id={`tooltip-${index}`}
                data-tooltip-content={item ? item.name : 'Vazio'}
              >
                {item ? <img src={item.image} alt={item.name} /> : null}
              </div>
            ))}
          </div>
          <div className='shelf-craft'>
            <div
              className={`shelf-craft-cell`}
            />
          </div>
        </div>
      </div>
      {items.map((item, index) => (
        <ReactTooltip id={`tooltip-${index}`} key={index} className="custom-tooltip" place="top" />
      ))}
    </main>
  );
}

export default ComponenteCentral;