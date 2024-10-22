import { db } from './FirebaseConfig';

import { ref, set, get, child } from 'firebase/database';

class GameplayService {
    async changeTheme(theme) {
        const inputText = `Please provide a set of 4 hexadecimal colors that form a cohesive color palette for a website with the theme ${theme}. The colors should be suitable for the following elements: 1. Header background 2. Sidebar background 3. Icon color 4. Text color Ensure that the colors are visually appealing and follow web design best practices. Respond only with the hex values separated by commas, no explanations.`;
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
           
            const colors = data.color.split(',').map(color => color.trim());
            if (colors.length >= 4) {
                return {
                    headerColor: colors[0],
                    sidebarColor: colors[1],
                    iconColor: colors[2],
                    textColor: colors[3]
                };
            } else {
                throw new Error('Formato de resposta inesperado');
            }
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    }

    async buscaRegiaoAtual(userId) {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${userId}/currentRegion`));
    
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            await set(ref(db, `users/${userId}/currentRegion`), 1);
            return 1;
        }
    }

    async buscaInventario(userId) {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${userId}/inventory`));
    
        if (snapshot.exists()) {
            console.log('Inventário encontrado:', snapshot.val());
            return snapshot.val();
        } else {
            console.log('Inventário não encontrado. Criando novo inventário...');
            const initialInventory = {
                regiao1: '',
                regiao2: '',
                regiao3: ''
            };
            await set(ref(db, `users/${userId}/inventory`), initialInventory);
            return initialInventory;
        }
    }
    
    async adicionaItemAoInventario(userId, regiao, item) {
        try {
            const dbRef = ref(db, `users/${userId}/inventory`);
            const snapshot = await get(dbRef);
    
            if (snapshot.exists()) {
                const inventory = snapshot.val();
                inventory[`regiao${regiao}`] = item;
                await update(dbRef, inventory);
                console.log(`Item ${item} adicionado ao inventário na região ${regiao}`);
            } else {
                console.error('Inventário não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao adicionar item ao inventário:', error);
        }
    }

    async setRegiaoAtual(userId, regiao) {
        try {
            await set(ref(db, `users/${userId}/currentRegion`), regiao);
            console.log(`Região atual do usuário ${userId} definida para ${regiao}`);
        } catch (error) {
            console.error('Erro ao definir a região atual:', error);
        }
    }

    async buscaHistoria(userId, theme, regiao) {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${userId}/story-${regiao}`));
        let inputText;

        switch(regiao) {
            case 'regiao1':
                inputText = `Create a plot for the first region called 'Twilight Library', in Portuguese-BR, taking into account the player's chosen theme: ${theme}. Describe the setting as a vast, mysterious library where towering shelves stretch endlessly into the shadows, and the perpetual twilight casts an eerie, timeless glow. The library’s ancient walls are filled with secrets from a forgotten era, reflecting the theme in subtle yet powerful ways. Reveal hints of the library’s dark or glorious past that tie into the theme, as the character begins their journey of discovery. They navigate the dusty corridors and ancient tomes, unaware of the full scope of the challenges ahead. The difficulty should be light, offering a sense of mystery and foreboding, while preparing the player for more intense trials to come. Only 6 lines of text, with no additional explanations. The text should be in Portuguese-BR`
                break;
            case 'regiao2':
                inputText = `Develop a plot for the second region called 'Archive of Lost Souls', in Portuguese-BR, based on the player's chosen theme: ${theme}. This region is a dark, oppressive archive where towering shelves hold more than just ancient texts—they imprison the souls of those who dared to seek the forbidden knowledge within. The air is thick with dread, and the environment feels increasingly claustrophobic, reflecting the growing danger and the weight of the secrets buried here. Mysteries deepen, and the connection between the archive’s dark history and the theme becomes more pronounced, hinting at the character’s own fate. The difficulty should escalate, as the player faces mounting threats and complex puzzles tied to the theme. Only 6 lines of text, with no additional explanations. The text should be in Portuguese-BR`
                break;
            case 'regiao3':
                inputText = `Write a plot for the third region called 'The Great Library of Aether', in Portuguese-BR, centered around the player's chosen theme: ${theme}. This region represents the culmination of the journey, an awe-inspiring, boundless library where books are not mere repositories of stories—they actively shape and alter realities. Describe how this library transcends both space and time, with its secrets dynamically adapting to the chosen theme. The atmosphere should evoke a sense of urgency and finality, as the character approaches the climax of their quest. The environment must feel vast, majestic, and deeply enigmatic, presenting intricate challenges that reflect the theme and push the character to their limits. Only 6 lines of text, with no additional explanations. The text should be in Portuguese-BR`
                break;
            default:
                inputText = '';
                break;
        }

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            try {
                const response = await fetch('http://localhost:5000/story-generator', { 
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

                const formattedHistoria = data.story.split('. ').map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);
    
                await set(ref(db, `users/${userId}/story-${regiao}`), formattedHistoria);
                return formattedHistoria;
            } catch (error) {
                console.error('Erro ao gerar história:', error);
            }
        }
    }

    async geraDerrota(theme, enemy) {
        const inputText = `
            Write a narrative about the defeat of the young factory worker from 1800s England. 
            He was inside a cursed book and faced a ${enemy}, but was ultimately defeated. 
            The story should have a somber tone, with hints of tragedy, as the worker succumbs to the curse of the book and loses his life. 
            The theme of the defeat should be tied to ${theme}, and the consequences of losing should be dire and mysterious. Don't give explications, I need only the text and nothing more.. Also, write 3 paragraphs. Do not use \ or / in the text.
        `;
    
        try {
            const response = await fetch('http://localhost:5000/story-generator', { 
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
            return data.story;
        } catch (error) {
            console.error('Erro ao gerar história de derrota:', error);
        }
    }
}

export default new GameplayService();