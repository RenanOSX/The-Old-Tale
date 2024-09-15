import Monster from '../models/Monster.js';

import { db } from './FirebaseConfig';

import { ref, set, get, child } from 'firebase/database';

class MonsterService {
    async buscaNomeMonstro(theme) {
        const inputText = `
        Generate a single name related to the theme "${theme}".
        The name should be one word, without repetitions,
        and can be inspired by various sources such as pop culture,
        religions, movies, mythology, or any other relevant themes. 
        Avoid including quotes around the name.`;
        
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

    async buscaMonstros(userId, theme) { 
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${userId}/monsters`));
    
        if (snapshot.exists()) {
          console.log('Monstros encontrados:', snapshot.val());
          const data = snapshot.val();
          return Object.values(data).map(monsterData => new Monster(
            monsterData.name,
            monsterData.rarity,
            monsterData.level,
            monsterData.health,
            monsterData.maxHealth
          ));
        } else {
          const newMonsters = {};
          for (let i = 0; i < 3; i++) {
            const name = await this.buscaNomeMonstro(theme);
            const newMonster = await this.criaMonstro(name);
            newMonsters[i] = newMonster;
          }
          await set(ref(db, `users/${userId}/monsters`), newMonsters);
          return Object.values(newMonsters);
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