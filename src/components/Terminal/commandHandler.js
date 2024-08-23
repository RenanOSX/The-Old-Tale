const items = {
    'apple': {
        name: 'apple', 
        price: 0.5
    },
    'banana': {
        name: 'banana',
        price: 0.3
    },
    'orange': {
        name: 'orange',
        price: 0.4
    }
}

const commandHandler = {
    help: () => ({ text: 'Available commands: help, echo, clear, date', type: 'success' }),
    echo: (args) => ({ text: args.join(' '), type: 'success' }),
    clear: () => ({ text: 'clear', type: 'clear' }), // Handle clear separately in the terminal component
    date: () => ({ text: new Date().toLocaleString(), type: 'success' }),
    shop: (args) => {
        // Verifica quantidade de argumentos
        if (args.length <= 0) {
          return { text: 'No argument added.', type: 'error' };
        } else {
            // Checa se o argumento é list e enviar uma lista de todos os items
            if (args[0] === 'list') {
                let itemList = '';
                for (const item in items) {
                    itemList += `${items[item].name} - Price: ${items[item].price}\n`;
                }
                return { text: itemList, type: 'success' };
            }
            // Verifica se o argumento é um item da lista, se for, retorna tudo sobre ele
            if (items[args[0]]) {
                return {
                    text: `Item: ${items[args[0]].name} - Price: ${items[args[0]].price}`, 
                    type: 'success' };
            } else {
                return {
                    text: 'Item not found.',
                    type: 'error' };
            }
        }
      }
      // Add new commands here
    };
  
  export default function handleCommand(command) {
    const [cmd, ...args] = command.trim().split(/\s+/);
    if (commandHandler[cmd]) {
      return commandHandler[cmd](args);
    } else {
      return { text: `Command not found: ${command}`, type: 'error' };
    }
  }
  