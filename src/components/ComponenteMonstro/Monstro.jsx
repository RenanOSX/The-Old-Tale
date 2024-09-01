import React, { useEffect, useState } from 'react';

import monsterImg from "../../assets/monster.png";

import "./Monstro.css";

import Monster from '../../models/Monster';

import Player from '../../models/Player';

function ComponenteMonstro({ monster, player, index, onMonsterUpdate }) {
    if (!monster) {
        return <div>Loading...</div>; // Ou qualquer outro fallback enquanto o monstro está sendo carregado
    }
        
    const [currentMonster, setCurrentMonster] = useState(new Monster(monster.name, monster.rarity, monster.level, monster.health, monster.maxHealth));
    const [currentPlayer, setCurrentPlayer] = useState(new Player(player.name, player.level, player.xp, player.stamina, player.attackDamage, player.money));

    useEffect(() => {
        setCurrentMonster(new Monster(monster.name, monster.rarity, monster.level, monster.health, monster.maxHealth));
    }, [monster]);

    const clickHandler = () => {
        if (currentMonster.health === 1) {
            onMonsterUpdate(index);
            console.log('Monster is dead');
        } else {
            currentMonster.takeDamage(currentPlayer.attackDamage);
            setCurrentMonster(new Monster(currentMonster.name, currentMonster.rarity, currentMonster.level, currentMonster.health, currentMonster.maxHealth));
        }
    };

    useEffect(() => {
        currentMonster.save();
    }, [currentMonster]);

    if (!currentMonster) return null;

    const borderColor = {
        "Comum": "#00FF00",
        "Incomum": "#0000FF",
        "Raro": "#FF00FF",
        "Épico": "#FFA500",
        "Legendário": "#FFD700",
        "Mítico": "#FF69B4",
        "Cósmico": "#00FFFF",
        "Divino": "#FF0000",
        "Eterno": "#FFFF00",
        "Maestral": "#C0C0C0",
        "Defeituoso": "#000000",
        "Administrador": "#FFFFFF"
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

export default ComponenteMonstro;