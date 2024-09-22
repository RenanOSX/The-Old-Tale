import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import monsterImg from "../../assets/images/monster.png";
import "./Monstro.css";
import Monster from '../../models/Monster';
import Player from '../../models/Player';

function ComponenteMonstro({ monster, player, index, onMonsterUpdate }) {
    const [isDamaged, setIsDamaged] = useState(false);
    const [damageValue, setDamageValue] = useState(0);
    const [showDamage, setShowDamage] = useState(false);

    const damageAnimation = useSpring({
        backgroundColor: isDamaged ? 'rgba(255, 0, 0, 0.5)' : 'transparent',
        transform: isDamaged ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isDamaged ? '0 0 20px rgba(255, 0, 0, 0.5)' : '0 0 10px rgba(0, 0, 0, 0.1)',
        config: { duration: 300 },
    });

    const damageTextAnimation = useSpring({
        opacity: showDamage ? 1 : 0,
        transform: showDamage ? 'translateY(-20px)' : 'translateY(0px)',
        config: { duration: 500 },
    });

    const [currentMonster, setCurrentMonster] = useState(new Monster(monster.name, monster.rarity, monster.level, monster.health, monster.maxHealth));
    const [currentPlayer, setCurrentPlayer] = useState(new Player(player._name, player._money, player._xp, player._xpToNextLevel, player._level, player._vida, player._dano, player._defesa, player._agilidade));

    useEffect(() => {
        setCurrentMonster(new Monster(monster.name, monster.rarity, monster.level, monster.health, monster.maxHealth));
        setCurrentPlayer(new Player(player._name, player._money, player._xp, player._xpToNextLevel, player._level, player._vida, player._dano, player._defesa, player._agilidade));
    }, [monster, player]);

    useEffect(() => {
        if (isDamaged) {
            const timer = setTimeout(() => setIsDamaged(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isDamaged]);

    useEffect(() => {
        if (showDamage) {
            const timer = setTimeout(() => setShowDamage(false), 500);
            return () => clearTimeout(timer);
        }
    }, [showDamage]);

    const clickHandler = () => {
        const damage = currentPlayer._dano;
        const updatedMonster = new Monster(currentMonster.name, currentMonster.rarity, currentMonster.level, currentMonster.health - damage, currentMonster.maxHealth);
        setCurrentMonster(updatedMonster);
        setDamageValue(damage);
        setIsDamaged(true);
        setShowDamage(true);

        if (updatedMonster.health <= 0) {
            onMonsterUpdate(index, updatedMonster.rarity);
            console.log('Monster is dead');
        }
    };

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
        <div className="monster-container">
            <animated.div className="monster-box" style={{ ...damageAnimation, borderColor: borderColor[currentMonster.rarity] }} onClick={clickHandler}>
                <h1 className={currentMonster.rarity}>
                    <div className="monster-name">
                        {currentMonster.name} {currentMonster.rarity} - {currentMonster.level}
                    </div>
                </h1>
                <img style={monsterBoxStyle} src={monsterImg} alt="Monster" />
                <h1 id="monsterhp">HP: {currentMonster.health} / {currentMonster.maxHealth} ({Math.round((currentMonster.health / currentMonster.maxHealth) * 100)}%)</h1>
            </animated.div>
            {showDamage && (
                <animated.div className="damage-text" style={damageTextAnimation}>
                    +{damageValue}
                </animated.div>
            )}
        </div>
    );
}

export default ComponenteMonstro;