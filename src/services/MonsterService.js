import Monster from '../models/Monster.js';

import Player from '../models/Player.js';

class MonsterService {
    async buscaNomeMonstro() {
        try {
            const response = await fetch('http://localhost:3001/ia', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const name = await response.text();
            return name;
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    }

    async criaMonstro(name) {
        return Monster.createNew(name); 
    }

    async buscaMonstros() {
        const storedMonsters = localStorage.getItem('monsters');
        if (storedMonsters) {
            return JSON.parse(storedMonsters);
        } else {
            const newMonsters = [];
            for (let i = 0; i < 3; i++) {
                const name = await this.buscaNomeMonstro();
                const newMonster = await this.criaMonstro(name);
                newMonsters.push(newMonster);
            }
            localStorage.setItem('monsters', JSON.stringify(newMonsters));
            return newMonsters;
        }
    }

    buscaJogador() {
        const storedPlayer = localStorage.getItem('player');
        if (storedPlayer) {
            return JSON.parse(storedPlayer);
        } else {
            const newPlayer = this.criaJogador();
            localStorage.setItem('player', JSON.stringify(newPlayer));
            return newPlayer;
        }
    }

    criaJogador() {
        return new Player();
    }
}

export default new MonsterService();