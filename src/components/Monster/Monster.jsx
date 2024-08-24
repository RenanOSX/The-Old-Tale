import React, { useState, useEffect } from 'react';
import monsterImg from "../../assets/monster.png";
import "./Monster.css";

function moneyAdd(amount) {
    let money = parseInt(localStorage.getItem('Money'));
    console.log(money);
    if (!isNaN(money)) {
        money += amount;
        localStorage.setItem('Money', money);
        console.log(money);
        return money;
    } else {
        localStorage.setItem('Money', 0);
        console.log("Set to 0");
        return 0;
    }
}

window.onload = function() {
    moneyAdd();
}

const names = ["Goblin", "Orc", "Troll", "Dragon", "Wyvern", "Giant", "Golem", "Elemental", "Demon", "Angel", "Fairy", "Imp", "Dwarf", "Elf", "Human", "Vampire", "Werewolf", "Zombie", "Skeleton", "Ghost", "Wraith", "Specter", "Lich", "Necromancer", "Warlock", "Wizard", "Sorcerer", "Mage", "Enchanter", "Summoner", "Conjurer", "Illusionist", "Diviner", "Alchemist", "Bard", "Druid", "Shaman", "Cleric", "Priest", "Paladin", "Monk", "Barbarian"];

const rarityList = {
    1: "Common", 
    2: "Uncommon", 
    3: "Rare", 
    4: "Epic", 
    5: "Legendary",
    6: "Mythic",
    7: "Cosmic",
    8: "Divine",
    9: "Eternal",
    10: "Godly",
    11: "Glitched",
    12: "???",
    13: "Admin"
};

const rarityWeights = {
    1: 1000,    // Common (most common)
    2: 500,     // Uncommon
    3: 200,     // Rare
    4: 80,      // Epic
    5: 30,      // Legendary
    6: 15,      // Mythic
    7: 7,       // Cosmic
    8: 3,       // Divine
    9: 1,       // Eternal
    10: 0.5,    // Godly
    11: 0.2,    // Glitched
    12: 0.05,   // ???
    13: 0.01,   // Admin
    14: 0       // Debug Monster    
};

const healthMultipliers = {
    1: 1,      // Common (base health)
    2: 1.1,    // Uncommon
    3: 1.2,    // Rare
    4: 1.5,    // Epic
    5: 2,      // Legendary
    6: 3,      // Mythic
    7: 10,     // Cosmic
    8: 25,     // Divine
    9: 50,     // Eternal
    10: 100,   // Godly
    11: 200,   // Glitched
    12: 500,   // ???
    13: 1000,   // Admin
    14: 1  // Debug Monster
};

// Function to get a random rarity key
function getRandomRarity(rarityWeights) {
    const totalWeight = Object.values(rarityWeights).reduce((sum, weight) => sum + weight, 0);
    let randomWeight = Math.random() * totalWeight;

    for (let key in rarityWeights) {
        if (randomWeight < rarityWeights[key]) {
            return parseInt(key);  // Return numeric key
        }
        randomWeight -= rarityWeights[key];
    }
}

// Function to calculate health based on level and rarity
function calculateHealth(baseHealth, monsterLevel) {
    const selectedRarityKey = getRandomRarity(rarityWeights);
    const rarityHealthMultiplier = healthMultipliers[selectedRarityKey];
    
    if (rarityHealthMultiplier === undefined) {
        return {
            rarity: 'Unknown',
            health: NaN,
            maxHealth: NaN
        };
    }

    // Scale health based on level
    const levelMultiplier = 1 + (monsterLevel / 10);
    const finalHealth = (baseHealth * monsterLevel) * rarityHealthMultiplier * levelMultiplier;
    const maxHealth = Math.round(finalHealth);

    return {
        rarity: rarityList[selectedRarityKey],
        health: maxHealth, // Initial health
        maxHealth: maxHealth // Maximum health
    };
}

function Monster() {
    const [monsterData, setMonsterData] = useState(null);
    const baseHealth = 10; // Base health for calculation
    const monsterLevel = 1; // Example level

    useEffect(() => {
        // Perform calculations before setting state
        const { rarity, health, maxHealth } = calculateHealth(baseHealth, monsterLevel);
        
        setMonsterData({
            name: names[Math.floor(Math.random() * names.length)],
            image: monsterImg,
            health,
            maxHealth,
            rarity
        });
    }, []); // Empty dependency array ensures this effect runs once after the initial render

    if (!monsterData) {
        // Render a loading state or nothing while calculations are in progress
        return <div>Loading...</div>;
    }

    let { name, image, health, maxHealth, rarity } = monsterData;

    // Based on the rarity of the monster apply different border colors for css
    const borderColor = rarity === "Common" ? "#00FF00" : // Green
                       rarity === "Uncommon" ? "#0000FF" : // Blue
                       rarity === "Rare" ? "#FF00FF" : // Magenta
                       rarity === "Epic" ? "#FFA500" : // Orange
                       rarity === "Legendary" ? "#FFD700" : // Gold
                       rarity === "Mythic" ? "#FF69B4" : // Hot Pink
                       rarity === "Cosmic" ? "#00FFFF" : // Cyan
                       rarity === "Divine" ? "#FF0000" : // Red
                       rarity === "Eternal" ? "#FFFF00" : // Yellow
                       rarity === "Godly" ? "#C0C0C0" : // Silver
                       rarity === "Glitched" ? "#000000" : // Black
                       rarity === "???" ? "#808080" : // Gray
                       rarity === "Admin" ? "#FFFFFF" : // White
                       "transparent";

    const monsterBoxStyle = {
        boxShadow: `0 0 1rem ${borderColor},
                    0 0 0.8rem ${borderColor},
                    0 0 .5rem ${borderColor},
                    inset 0 0 1.0rem ${borderColor}`,
        cursor: "pointer"
    };

    // Function for dealing with damage to the monster by click
    const clickHandler = () => {
        // Deal 1 dmg to health
        setMonsterData(prevState => {
            if (prevState.health <= 1) {
                // Generate a new monster if the current one is dead
                const { rarity, health, maxHealth } = calculateHealth(baseHealth, monsterLevel);
                moneyAdd(1);
                return {
                    ...prevState,
                    health,
                    maxHealth,
                    rarity
                };
            } else {
                return {
                    ...prevState,
                    health: prevState.health - 1 // If monster is not dead deal 1 dmg
                };
            }
        })
    };

    return (
        <span className="monster-box">
            <h1 className={rarity}>{name} {rarity} Lvl {monsterLevel}</h1>
            <img style={monsterBoxStyle} onClick={clickHandler} src={image} alt="Monster"/>
            <h1 id="monsterhp">HP: {health} / {maxHealth} ({Math.round((health / maxHealth) * 100)}%)</h1>
        </span>
    );
}

export default Monster;