import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import { Player, Stage } from '@/data/types/types';
import { updatePlayerRoles } from '@/utils';
import { useCallback } from 'react';

export const useResetGame = () => {
  const { gameState, updateGameState } = useGameState();
  const { players } = gameState;

  const getNewDealerIndex = useCallback(() => {
    const oldDealer = players.findIndex((player) => player.isDealer === true);
    return (oldDealer + 1) % players.length;
  }, [gameState]);

  const addPotToWinner = useCallback(
    (updatedPlayers: Player[], winner: Player, pot: number) => {
      const winnerIndex = updatedPlayers.findIndex(
        (player) => player.name === winner.name
      );
      updatedPlayers[winnerIndex] = {
        ...updatedPlayers[winnerIndex],
        chips: updatedPlayers[winnerIndex].chips + pot,
      };
      return updatedPlayers;
    },
    []
  );

  const resetGame = useCallback(
    (winner: Player, pot: number) => {
      const newDealer = getNewDealerIndex();
      let updatedPlayers = updatePlayerRoles(
        newDealer,
        gameState.smallBlind,
        gameState.players
      );
      updatedPlayers = addPotToWinner(updatedPlayers, winner, pot);

      const newGameState = {
        ...gameState,
        players: updatedPlayers,
        pot: gameState.smallBlind + gameState.bigBlind,
        highestBet: gameState.bigBlind,
        movesInCurrentStage: 0,
        playersInGame: gameState.players.length,
        stage: Stage.PreFlop,
        playerWinner: null,
      };

      updateGameState(newGameState);
    },
    [gameState, getNewDealerIndex, addPotToWinner]
  );

  return { resetGame };
};

export default useResetGame;
