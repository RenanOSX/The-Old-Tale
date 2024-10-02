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

    async geraHistoria(theme, etapa, length='medium') {
        let inputText, lengthText;
        
        switch(length) {
            case 'short':
                lengthText = '((Generate a short story))';
                break;
            case 'medium':
                lengthText = '((Generate a medium story))';
                break;
            case 'long':
                lengthText = '((Generate a long story))';
                break;
            default:
                lengthText = '((Generate a medium story))';
        }
        
        switch(etapa) {
            case 'introducao':
                inputText = `Generate the introduction, in Portuguese-BR, to a story set in 1800s England, where a young factory worker finds a cursed book. The story will revolve around the theme of ${theme}. As soon as he opens the book, strange things start happening, and he is pulled into the book’s narrative. The story should be tied to the theme and slowly reveal that the worker must survive through it. Keep the style atmospheric and foreboding. Don't give explications, I need only the text and nothing more. ${lengthText}`;
                break;
            case 'conflito':
                inputText = `Write the next part of the story, in Portuguese-BR, where the young factory worker is now inside the book’s world, facing enemies and challenges directly related to the theme of ${theme}. The worker realizes that if he dies in the book, he will lose his life in the real world as well. Introduce the first major enemy, which is deeply related to the theme. Make the challenge feel dangerous, but give the worker a glimmer of hope.Don't give explications, I need only the text and nothing more. ${lengthText}`;
                break;
            case 'climax':
                inputText = `The young factory worker is nearing the end of the book’s story, and the final challenge emerges. Write, in Portuguese-BR, the climactic confrontation with the main antagonist or obstacle, related to the theme of ${theme}. Make it a high-stakes battle or puzzle that seems nearly impossible, but leave room for a clever resolution. Make sure the tension peaks here, and show the worker’s desperation and determination.Don't give explications, I need only the text and nothing more. ${lengthText}`;
                break;
            case 'conclusao':
                inputText = `Write the conclusion, in Portuguese-BR, where the young factory worker defeats the final enemy or overcomes the final challenge. He returns to the real world, but not without consequences. The ending should feel satisfying but leave an air of mystery or lingering effect of the cursed book. The theme of ${theme} should still play a role in how the story closes.Don't give explications, I need only the text and nothing more. ${lengthText}`;
                break;
            default:
                inputText = '';
        }
        console.log('Input text:', inputText);
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
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.story;
        } catch (error) {
            console.error('Erro ao gerar história:', error);
        }
    }

    async geraDerrota(theme, enemy) {
        const inputText = `
            Write a narrative about the defeat of the young factory worker from 1800s England. 
            He was inside a cursed book and faced a ${enemy}, but was ultimately defeated. 
            The story should have a somber tone, with hints of tragedy, as the worker succumbs to the curse of the book and loses his life. 
            The theme of the defeat should be tied to ${theme}, and the consequences of losing should be dire and mysterious. Don't give explications, I need only the text and nothing more..
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