import ListaDeRaridades from '../constants/ListaDeRaridades.js';

import PesoDeRaridade from '../constants/PesosDeRaridade.js';

import MultiplicadorDeVida from '../constants/MultiplicadoresDeVida.js';

import IntervaloDeNiveis from '../constants/IntervalosDeNiveis.js';

class Monster {
    constructor(
      name = null,
      rarity = Monster.buscarRaridadeAleatoria(),
      level = Monster.buscarNivelAleatorio(rarity),
      health = null,
      maxHealth = null
    ) {
      this.name = name;
      this.rarity = rarity;
      this.level = level;
      this.maxHealth = maxHealth || this.calcularVida();
      this.health = health !== null ? health : this.maxHealth;
    }
  
    static buscarRaridadeAleatoria() {
      const pesoTotal = Object.values(PesoDeRaridade).reduce((somador, peso) => somador + peso, 0);
      let pesoAleatorio = Math.random() * pesoTotal;
  
      for (let key in PesoDeRaridade) {
        if (pesoAleatorio < PesoDeRaridade[key]) {
          return parseInt(key);
        }
        pesoAleatorio -= PesoDeRaridade[key];
      }
      return 1;
    }
  
    static buscarIntervaloDeRaridade(rarityKey) {
      return IntervaloDeNiveis[rarityKey] || [1, 5];
    }
  
    static buscarNivelAleatorio(rarityKey) {
      const [nivelMinimo, nivelMaximo] = this.buscarIntervaloDeRaridade(rarityKey);
      return Math.floor(Math.random() * (nivelMaximo - nivelMinimo + 1)) + nivelMinimo;
    }
  
    calcularVida() {
      const rarityKey = Object.keys(ListaDeRaridades).find(key => ListaDeRaridades[key] === this.rarity);
      const rarityHealthMultiplier = MultiplicadorDeVida[rarityKey];
      const levelMultiplier = 1 + (this.level / 10);
      const baseHealth = 10;
      return Math.round((baseHealth * this.level) * rarityHealthMultiplier * levelMultiplier);
    }
  
    isDead() {
      return this.health <= 1;
    }
  
    takeDamage(amount) {
      if(amount >= this.health) {
        this.health = 0;
      } else {
        this.health = Math.max(this.health - amount, 0);
      }
    }
  
    static createNew(name) {
      const rarityKey = this.buscarRaridadeAleatoria();
      const rarity = ListaDeRaridades[rarityKey];
      const level = this.buscarNivelAleatorio(rarityKey);
  
      return new Monster(name, rarity, level);
    }
}

export default Monster;