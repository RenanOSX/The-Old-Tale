import XpPorRaridade from "../constants/XpPorRaridade";

class Player {
    constructor(
        name = 'Default Player',
        money = 5,
        xp = 0,
        xpToNextLevel = 100,
        level = 1,
        vida = 100,
        dano = 1,
        defesa = 1,
        agilidade = 1
    ) {
        this._name = name;
        this._money = money;
        this._xp = xp; 
        this._xpToNextLevel = xpToNextLevel || this.calculateXpToNextLevel(level);
        this._level = level;
        this._vida = vida;
        this._dano = dano;
        this._defesa = defesa;
        this._agilidade = agilidade;
    }

    static createNew(name) {
        return new Player(name);
    }

    static calculateXpToNextLevel(level = this._level) {
        if (level <= 1) {
            return 100;
        } else if (level === 2) {
            return 200;
        } else if (level === 3) {
            return 300;
        } else if (level === 4) {
            return 400;
        } else if (level === 5) {
            return 500;
        } else if (level === 6) {
            return 600;
        } else if (level === 7) {
            return 700;
        } else if (level === 8) {
            return 800;
        } else if (level === 9) {
            return 900;
        } else if (level === 10) {
            return 1000;
        }
    }

    addXP(raridadeMonstro) {
        const xpMonster = XpPorRaridade[raridadeMonstro];
        
        if (xpMonster !== undefined) {
            this._xp += xpMonster;
            console.log('XP Atual: ', this._xp);
            this.levelUp();
            this.save();
        } else {
            console.error('Raridade do monstro inválida:', raridadeMonstro);
        }
    }

    spendVida(amount) {
        if (amount <= this._vida) {
            this._vida -= amount;
        } else {
            console.error("Not enough stamina");
        }
        this.save();
    }

    earnMoney(amount) {
        this._money += amount;
        this.save();
    }

    levelUp() {
        if (this._xp >= this._xpToNextLevel) { 
            if (this._level === 10) {
                this._xp = 0;
                this._money += 10;
            } else {
                this._xp = 0; 
                this._vida += 10;
                this._level += 1;
                this._money += 1;
                this._xpToNextLevel = Player.calculateXpToNextLevel(this._level);
            }
        }
        this.save();
    }

    save() {
        const playerData = {
            _name: this._name,
            _money: this._money,
            _xp: this._xp,
            _xpToNextLevel: this._xpToNextLevel,
            _level: this._level,
            _vida: this._vida,
            _dano: this._dano,
            _defesa: this._defesa,
            _agilidade: this._agilidade
        };
        localStorage.setItem('player', JSON.stringify(playerData));
    }

    load() {
        const storedPlayer = localStorage.getItem('player');
        if (storedPlayer) {
            const playerData = JSON.parse(storedPlayer);
            this._name = playerData._name;
            this._money = playerData._money;
            this._xp = playerData._xp !== null ? playerData._xp : 0;
            this._xpToNextLevel = playerData._xpToNextLevel;
            this._level = playerData._level;
            this._vida = playerData._vida;
            this._dano = playerData._dano;
            this._defesa = playerData._defesa;
            this._agilidade = playerData._agilidade;
        }
    }
}

export default Player;