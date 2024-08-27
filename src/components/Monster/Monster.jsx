import React, { useEffect, useState } from 'react';
import monsterImg from "../../assets/monster.png";
import "./Monster.css";
import Monster from '../../models/Monster';

function MonsterComponent({ monster, player, onMonsterUpdate }) {
  const [currentMonster, setCurrentMonster] = useState(new Monster(monster.name, monster.rarity, monster.level));
  
  const clickHandler = () => {
    if (currentMonster.isDead()) {
      onMonsterUpdate(); // Notifica o componente pai sobre a atualização do monstro
    } else {
      currentMonster.takeDamage(player.attackDamage);
      setCurrentMonster(currentMonster)
      console.log(currentMonster)
    }
  };

  useEffect(() => {
    currentMonster.save()
  }, [currentMonster])
  
  if (!currentMonster) return null;

  const borderColor = {
    "Common": "#00FF00",
    "Uncommon": "#0000FF",
    "Rare": "#FF00FF",
    "Epic": "#FFA500",
    "Legendary": "#FFD700",
    "Mythic": "#FF69B4",
    "Cosmic": "#00FFFF",
    "Divine": "#FF0000",
    "Eternal": "#FFFF00",
    "Godly": "#C0C0C0",
    "Glitched": "#000000",
    "???": "#808080",
    "Admin": "#FFFFFF"
  }[currentMonster.rarity] || "transparent";

  const monsterBoxStyle = {
    boxShadow: `0 0 1rem ${borderColor},
                0 0 0.8rem ${borderColor},
                0 0 .5rem ${borderColor},
                inset 0 0 1.0rem ${borderColor}`,
    cursor: "pointer"
  };

  return (
    <span className="monster-box">
      <h1 className={currentMonster.rarity}>
        <div className="monster-name">
          {currentMonster.name} {currentMonster.rarity} - {currentMonster.level}
        </div>
      </h1>
      <img style={monsterBoxStyle} onClick={clickHandler} src={monsterImg} alt="Monster" />
      <h1 id="monsterhp">HP: {currentMonster.health} / {currentMonster.maxHealth} ({Math.round((currentMonster.health / currentMonster.maxHealth) * 100)}%)</h1>
    </span>
  );
}

export default MonsterComponent;
