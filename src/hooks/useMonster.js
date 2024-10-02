import { useState, useEffect, useCallback } from 'react';

import Monster from '../models/Monster';

import Player from '../models/Player';

const useMonster = (monster, player, index, onMonsterUpdate, theme) => {
    const [isDamaged, setIsDamaged] = useState(false);
    const [damageValue, setDamageValue] = useState(0);
    const [showDamage, setShowDamage] = useState(false);
    const [damagePosition, setDamagePosition] = useState({ top: 0, left: 0 });
    const [image, setImage] = useState(null);
    const [currentMonster, setCurrentMonster] = useState(new Monster(monster.name, monster.rarity, monster.level, monster.health, monster.maxHealth));
    const [currentPlayer, setCurrentPlayer] = useState(new Player(player._name, player._money, player._xp, player._xpToNextLevel, player._level, player._vida, player._dano, player._defesa, player._agilidade));

    const fetchImage = useCallback(async () => {
        try {
        const response = await import(`../assets/images/monsters/${theme}/${index}.png`);
        setImage(response.default);
        } catch (err) {
        console.error('Error fetching image:', err);
        }
    }, [index, theme]);

    useEffect(() => {
        setCurrentMonster(new Monster(monster.name, monster.rarity, monster.level, monster.health, monster.maxHealth));
        setCurrentPlayer(new Player(player._name, player._money, player._xp, player._xpToNextLevel, player._level, player._vida, player._dano, player._defesa, player._agilidade));
        fetchImage();
    }, [monster, player, fetchImage]);

    useEffect(() => {
        if (isDamaged) {
        const timer = setTimeout(() => setIsDamaged(false), 300);
        return () => clearTimeout(timer);
        }
    }, [isDamaged]);

    useEffect(() => {
        if (showDamage) {
        const timer = setTimeout(() => setShowDamage(false), 200);
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
        }
    };

    return {
        isDamaged,
        damageValue,
        showDamage,
        damagePosition,
        image,
        currentMonster,
        clickHandler,
    };
};

export default useMonster;