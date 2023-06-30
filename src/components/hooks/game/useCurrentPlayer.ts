import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import { useState, useEffect } from 'react';
import { findNextTurn } from '@/utils';
import { useStage } from './useStage';

export const useCurrentPlayer = () => {
  const { gameState, updateGameState } = useGameState();
  const { players, turn, playersInGame } = gameState;
  const { handleStageUpdate } = useStage();

  const [loading, setLoading] = useState<boolean>(false);
  const currentPlayer = players[turn] || {};

  const handlePlayerChange = () => {
    setLoading(true);

    // If player is folded or all in, move to next player
    if (currentPlayer.isFolded || currentPlayer.isAllIn) {
      updateGameState({
        ...gameState,
        turn: playersInGame >= 2 ? findNextTurn(turn, players) : -1, // If there are 2 or more players in the game, find the next turn, otherwise set turn to -1
      });
      return;
    }

    handleStageUpdate();

    setLoading(false);
  };

  // Update stage when turn or currentPlayer changes
  useEffect(() => {
    handlePlayerChange();
  }, [turn, currentPlayer]);

  return { currentPlayer, loading, handlePlayerChange };
};
