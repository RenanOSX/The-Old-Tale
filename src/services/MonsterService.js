import Monster from '../models/Monster.js';

import { db } from './FirebaseConfig';

import { ref, set, get, child } from 'firebase/database';

class MonsterService {
    async buscaNomeMonstro() {
        const inputText = 'Give a single name for a fantasy monster, only one word, without repetitions.';
        try {
            const response = await fetch('http://localhost:5000/names-generator', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: inputText
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(`API response: ${JSON.stringify(data)}`);
            return data.monster_name;
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    }

    async criaMonstro(name) {
        return Monster.createNew(name); 
    }

    async buscaMonstros(userId) {
        const monstersRef = ref(db, `users/${userId}/monsters`);
        const snapshot = await get(monstersRef);

        if (snapshot.exists()) {
        const data = snapshot.val();
        return data.map(monsterData => new Monster(
            monsterData.name,
            monsterData.rarity,
            monsterData.level,
            monsterData.health,
            monsterData.maxHealth
        ));
        } else {
            const newMonsters = [];
            for (let i = 0; i < 3; i++) {
                const name = await this.buscaNomeMonstro();
                const newMonster = await this.criaMonstro(name);
                newMonsters.push(newMonster);
            }
            await set(monstersRef, newMonsters);
            return newMonsters;
        }
    }

    async salvaMonstros(userId, monsters) {
        try {
            await set(ref(db, `users/${userId}/monsters`), monsters);
        } catch (error) {
            console.error('Erro ao salvar monstros no Firebase:', error);
        }
    }

    async changeTheme(theme) {
        const inputText = `send me a color in hexadecimal related to the theme ${theme}, 
        do not send me anything else besides that because I will apply in a css style`;
        try {
            const response = await fetch('http://localhost:5000/theme-generator', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: inputText
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(`API response: ${JSON.stringify(data)}`);
            return data.color; // Supondo que a resposta contenha uma cor
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    }
}

export default new MonsterService();