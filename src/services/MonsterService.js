import Monster from '../models/Monster.js';

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