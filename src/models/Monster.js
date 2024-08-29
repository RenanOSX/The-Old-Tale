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
    1: 1000,
    2: 500,
    3: 200,
    4: 80,
    5: 30,
    6: 15,
    7: 7,
    8: 3,
    9: 1,
    10: 0.5,
    11: 0.2,
    12: 0.05,
    13: 0.01,
    14: 0
};

const healthMultipliers = {
    1: 1,
    2: 1.1,
    3: 1.2,
    4: 1.5,
    5: 2,
    6: 3,
    7: 10,
    8: 25,
    9: 50,
    10: 100,
    11: 200,
    12: 500,
    13: 1000,
    14: 1
};
// Monster.js
class Monster {
    constructor(
      name = Monster.getRandomName(),
      rarity = Monster.getRandomRarity(),
      level = Monster.getRandomLevel(rarity),
      health = null,
      maxHealth = null
    ) {
      this.name = name;
      this.rarity = rarity;
      this.level = level;
      this.maxHealth = maxHealth || this.calculateHealth();
      this.health = health !== null ? health : this.maxHealth;
      if (isNaN(this.health) && this.health !== null) {
        console.error("Failed to initialize health for monster:", this);
        this.health = this.maxHealth = 1; // Valor padrão em caso de erro
      }
    }
  
    static getRandomName() {
      return names[Math.floor(Math.random() * names.length)];
    }
  
    static getRandomRarity() {
      const totalWeight = Object.values(rarityWeights).reduce((sum, weight) => sum + weight, 0);
      let randomWeight = Math.random() * totalWeight;
  
      for (let key in rarityWeights) {
        if (randomWeight < rarityWeights[key]) {
          return parseInt(key);
        }
        randomWeight -= rarityWeights[key];
      }
      return 1; // Default to Common if something goes wrong
    }
  
    static getLevelRange(rarityKey) {
      const levelRanges = {
        1: [1, 5],      // Common
        2: [5, 10],     // Uncommon
        3: [10, 20],    // Rare
        4: [20, 30],    // Epic
        5: [30, 50],    // Legendary
        6: [50, 75],    // Mythic
        7: [75, 100],   // Cosmic
        8: [100, 150],  // Divine
        9: [150, 200],  // Eternal
        10: [200, 250], // Godly
        11: [250, 300], // Glitched
        12: [300, 350], // ???
        13: [350, 400], // Admin
      };
      return levelRanges[rarityKey] || [1, 5];
    }
  
    static getRandomLevel(rarityKey) {
      const [minLevel, maxLevel] = this.getLevelRange(rarityKey);
      return Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel;
    }
  
    calculateHealth() {
      const rarityKey = Object.keys(rarityList).find(key => rarityList[key] === this.rarity);
      const rarityHealthMultiplier = healthMultipliers[rarityKey];
      const levelMultiplier = 1 + (this.level / 10);
      const baseHealth = 10;
      return Math.round((baseHealth * this.level) * rarityHealthMultiplier * levelMultiplier);
    }
  
    isDead() {
      return this.health <= 1;
    }
  
    takeDamage(amount) {
      this.health = Math.max(this.health - amount, 0);
    }
  
    save() {
      // Obtém a lista de monstros do localStorage
      let monsters = JSON.parse(localStorage.getItem('monsters')) || [];
      
      // Verifica se o monstro já existe na lista
      const index = monsters.findIndex(m => m.name === this.name);
      if (index !== -1) {
        // Atualiza o monstro existente
        monsters[index] = this;
      } else {
        // Adiciona um novo monstro à lista
        monsters.push(this);
      }
  
      // Salva a lista atualizada no localStorage
      localStorage.setItem('monsters', JSON.stringify(monsters));
    }
  
    static load() {
      const data = JSON.parse(localStorage.getItem('monster'))

      if (data && !isNaN(data.health)) {
        const { name, rarity, level, health, maxHealth } = data;
        const monster = new Monster(name, rarity, level);
        monster.health = health;
        monster.maxHealth = maxHealth;
        return monster;
      }
      return null;
    }
  
    static createNew() {
      const rarityKey = this.getRandomRarity();
      const name = this.getRandomName();
      const rarity = rarityList[rarityKey];
      const level = this.getRandomLevel(rarityKey);
  
      return new Monster(name, rarity, level);
    }
  }
  
  export default Monster;