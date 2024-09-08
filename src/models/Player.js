class Player {

    constructor() {
        this._money = parseInt(localStorage.getItem('PlayerMoney'), 10) || 5;
        this._xp = parseInt(localStorage.getItem('PlayerXP'), 10) || 0;
        this._level = parseInt(localStorage.getItem('PlayerLevel'), 10) || 1;
        this._stamina = parseInt(localStorage.getItem('PlayerStamina'), 10) || 100; 
        this._attackDamage = parseInt(localStorage.getItem('PlayerAttackDamage'), 10) || 10;
    }

    get xp() {
        return this._xp;
    }

    get stamina() {
        return this._stamina;
    }

    get attackDamage() {
        return this._attackDamage;
    }

    get money() {
        return this._money;
    }

    get level() {
        return this._level;
    }

    set level(value) {
        this._level = value;
        localStorage.setItem('PlayerLevel', value);
    }

    set xp(value) {
        this._xp = value;
        localStorage.setItem('PlayerXP', value);
    }

    set stamina(value) {
        this._stamina = value;
        localStorage.setItem('PlayerStamina', value);
    }

    set attackDamage(value) {
        this._attackDamage = value;
        localStorage.setItem('PlayerAttackDamage', value);
    }

    set money(value) {
        this._money = value;
        localStorage.setItem('PlayerMoney', value);
    }

    addXP(amount) {
        this.xp += amount;
        this.levelUp();
    }

    spendStamina(amount) {
        if (amount <= this.stamina) {
            this.stamina -= amount;
        } else {
            console.error("Not enough stamina");
        }
    }

    earnMoney(amount) {
        this.money += amount;
    }

    levelUp() {
        if (this.xp >= 100) { // Exemplo de condição para subir de nível
            this.xp = 0; // Subtrai a XP necessária para o nível
            this.stamina += 10; // Aumenta a stamina
            this.attackDamage += 5; // Aumenta o dano de ataque
            this.level += 1;
            // Salva as novas variáveis no localStorage
            this.save();
        }
    }

    save() {
        localStorage.setItem('PlayerXP', this.xp);
        localStorage.setItem('PlayerStamina', this.stamina);
        localStorage.setItem('PlayerAttackDamage', this.attackDamage);
        localStorage.setItem('PlayerMoney', this.money);
        localStorage.setItem('PlayerLevel', this.level);
    }
}

export default Player;
