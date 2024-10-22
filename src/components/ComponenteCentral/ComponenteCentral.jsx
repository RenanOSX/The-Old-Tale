import React, { useContext, useState } from 'react';

import './ComponenteCentral.css';

import { Tooltip as ReactTooltip } from 'react-tooltip'; // Correct import statement

import ComponenteMonstro from '../ComponenteMonstro/Monstro.jsx';

import placeHolder from '/public/assets/images/monster.png';

import { GameContext } from '../../context/GameContext.jsx';

import anelPng from '/public/assets/icons/anel-pristino.png';

import grimorio from '/public/assets/icons/grimorio-sombrio.png';

import marcador from '/public/assets/icons/marcador-de-tempo-quantico.png';

function ComponenteCentral({ onMonsterUpdate }) {
  const {
    monsters,
    loadingMonsters,
    player
  } = useContext(GameContext);

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

  const handleImageClick = (itemName) => {
    console.log(`Item ${itemName} clicado`);
    // Adicione a lógica que você deseja executar ao clicar na imagem
  };

  return (
    <main className="main-content">
      <div className='content'>
        <div className="main-section-content">
          {monsters.map((monster, index) => (
            loadingMonsters[index] ? (
              <div key={index} className="monster-container">
                <div className="monster-box" style={placeHolderStyle}>
                    <div className="monster-name">
                      <h1>‎</h1>
                    </div>
                    <img src={placeHolder}/>
                    <h1 id="monsterhp">Loading...</h1>
                  </div>
                </div>
            ) : (
              <ComponenteMonstro
                key={index}
                index={index}
                monster={monster}
                player={player}
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
          <div className='coletaveis'>
            <img
              src={anelPng}
              alt="Anel Pristino"
              className="anel-pristino"
              data-tooltip-id="tooltip-anel"
              data-tooltip-content="Anel Pristíno"
              onClick={() => handleImageClick('Anel Pristino')}
            />
            <img
              src={grimorio}
              alt="Grimório Sombrio"
              className="grimorio-sombrio"
              data-tooltip-id="tooltip-grimorio"
              data-tooltip-content="Grimório Sombrio"
              onClick={() => handleImageClick('Grimório Sombrio')}
            />
            <img
              src={marcador}
              alt="Marcador de Tempo Quântico"
              className="marcador-de-tempo"
              data-tooltip-id="tooltip-marcador"
              data-tooltip-content="Marcador de Tempo Quântico"
              onClick={() => handleImageClick('Marcador de Tempo Quântico')}
            />
          </div>
        </div>
      </div>
      {items.map((item, index) => (
        <ReactTooltip id={`tooltip-${index}`} key={index} className="custom-tooltip" place="top" />
      ))}
      <ReactTooltip id="tooltip-anel" className="custom-tooltip" place="top" />
      <ReactTooltip id="tooltip-grimorio" className="custom-tooltip" place="top" />
      <ReactTooltip id="tooltip-marcador" className="custom-tooltip" place="top" />
    </main>
  );
}

export default ComponenteCentral;