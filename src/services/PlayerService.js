import Player from '../models/Player';

class PlayerService {
    async buscaJogador(name = 'Player') {
        const playerData = JSON.parse(localStorage.getItem('player'));
        if (playerData) {
            return playerData; // Instanciar Player com os dados do localStorage

        } else {
            const player = this.criaJogador(name);
            localStorage.setItem('player', JSON.stringify(player));
            return player;
        }
    }

    criaJogador(name) {
        return Player.createNew(name);
    }
}

export default new PlayerService();