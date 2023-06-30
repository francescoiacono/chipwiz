import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import { useState, useEffect } from 'react';
import updateGameStage from '@/utils/updateGameStage';
import { Player } from '@/data/types/types';

export const useCurrentPlayer = () => {
  const { gameState, updateGameState } = useGameState();
  const {
    players,
    highestBet,
    turn,
    movesInCurrentStage,
    playersInGame,
    stage,
  } = gameState;

  const [loading, setLoading] = useState<boolean>(false);
  const currentPlayer = players[turn] || {};

  const updateStage = () => {
    setLoading(true);
    const newStage = updateGameStage(movesInCurrentStage, playersInGame, stage);
    const addMove = newStage === stage ? movesInCurrentStage + 1 : 1;
    let newHighestBet = highestBet;
    let resetPlayers: Player[] | null = null;

    if (newStage !== stage) {
      resetPlayers = players.map((player) => {
        player.bet = 0;
        return player;
      });
      newHighestBet = 0;
    }

    updateGameState({
      ...gameState,
      movesInCurrentStage: addMove,
      stage: newStage,
      highestBet: newHighestBet,
      players: resetPlayers || players,
    });
    setLoading(false);
  };

  useEffect(() => {
    updateStage();
  }, [turn, currentPlayer]);

  return { currentPlayer, updateGameState, loading, updateStage };
};
