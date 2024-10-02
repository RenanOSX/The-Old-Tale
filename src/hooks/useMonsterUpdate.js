import { useContext, useCallback } from 'react';

import { GameContext } from '../context/GameContext';

import MonsterService from '../services/MonsterService';

import PlayerService from '../services/PlayerService';

import Player from '../models/Player';

const useMonsterUpdate = () => {
    const { user, theme, monsters, player, setMonsters, setPlayer, setLoadingMonsters } = useContext(GameContext);

    const handleMonsterUpdate = useCallback(async (index, raridade) => {
        setLoadingMonsters((prev) => {
        const newLoadingMonsters = [...prev];
        newLoadingMonsters[index] = true;
        return newLoadingMonsters;
        });

        try {
        await MonsterService.criaImagem(theme, index);
        const name = await MonsterService.buscaNomeMonstro(theme);
        const newMonster = await MonsterService.criaMonstro(name);
        const newMonsters = [...monsters];
        newMonsters[index] = newMonster;
        setMonsters(newMonsters);

        const updatedPlayer = new Player(player._name, player._money, player._xp, player._xpToNextLevel, player._level, player._vida, player._dano, player._defesa, player._agilidade);
        updatedPlayer.addXP(raridade);
        updatedPlayer.earnMoney(1);
        setPlayer(updatedPlayer);

        if (user) {
            await MonsterService.salvaMonstros(user.uid, newMonsters);
            await PlayerService.salvaJogador(user.uid, updatedPlayer);
        }
        } catch (error) {
        console.error('Erro ao atualizar o monstro:', error);
        } finally {
        setLoadingMonsters((prev) => {
            const newLoadingMonsters = [...prev];
            newLoadingMonsters[index] = false;
            return newLoadingMonsters;
        });
        }
    }, [user, theme, monsters, player, setMonsters, setPlayer, setLoadingMonsters]);

    return handleMonsterUpdate;
};

export default useMonsterUpdate;