import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import { useState, useEffect } from 'react';
import { updateGameStage } from '@/utils';
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

    // If player is folded or all in, move to next player
    if (currentPlayer.isFolded || currentPlayer.isAllIn) {
      console.log('Player is folded, moving to next player');

      updateGameState({
        ...gameState,
        turn: (turn + 1) % players.length,
      });

      return;
    }

    // New stage is either a new stage or it stays the same
    const newStage = updateGameStage(movesInCurrentStage, playersInGame, stage);

    // If new stage is the same as the old stage, add 1 to movesInCurrentStage
    let addMove = movesInCurrentStage + 1;
    let newHighestBet = highestBet;
    let resetPlayers: Player[] | null = null;

    // If new stage is different, reset move, highestBet, and players bets for new stage
    if (newStage !== stage) {
      resetPlayers = players.map((player) => {
        player.bet = 0;
        return player;
      });
      newHighestBet = 0;
      addMove = 1;
    }

    // Update game state
    updateGameState({
      ...gameState,
      movesInCurrentStage: addMove,
      stage: newStage,
      highestBet: newHighestBet,
      players: resetPlayers || players,
    });
    setLoading(false);
  };

  // Update stage when turn or currentPlayer changes
  useEffect(() => {
    updateStage();
  }, [turn, currentPlayer]);

  return { currentPlayer, updateGameState, loading, updateStage };
};
