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
                inputText = `Generate the introduction, in Portuguese-BR, to a story set in 1900s England, where a young depressive factory worker finds a cursed book. The story will revolve around the theme of ${theme}. As soon as he opens the book, strange things start happening, and he is pulled into the book’s narrative. Describe the eerie and foreboding atmosphere of the factory and its surroundings. The story should be tied to the theme and slowly reveal that the worker must survive through it. Keep the style atmospheric and foreboding. Don't give explications, I need only the text and nothing more. Only 6 lines of text.`               
                break;
            case 'regiao2':
                inputText = `Write the next part of the story, in Portuguese-BR, where the young depressive factory worker is now inside the book’s world, facing enemies and challenges directly related to the theme of ${theme}. The worker realizes that if he dies in the book, he will lose his life in the real world as well. Introduce the first major enemy, which is deeply related to the theme. Describe the dangerous and mysterious region the worker finds himself in, detailing the environment and the challenges it presents. Make the challenge feel dangerous, but give the worker a glimmer of hope. Don't give explications, I need only the text and nothing more. Only 6 lines of text.`         
                break;
            case 'regiao3':
                inputText = `The young depressive factory worker is nearing the end of the book’s story, and the final challenge emerges. Write, in Portuguese-BR, the climactic confrontation with the main antagonist or obstacle, related to the theme of ${theme}. Describe the final region in vivid detail, making it clear how it relates to the theme. Make it a high-stakes battle or puzzle that seems nearly impossible, but leave room for a clever resolution. Make sure the tension peaks here, and show the worker’s desperation and determination. Don't give explications, I need only the text and nothing more. Only 6 lines of text.`               
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