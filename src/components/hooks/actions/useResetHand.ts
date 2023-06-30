import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import { Player, Stage } from '@/data/types/types';
import { findNextDealer, updatePlayerRoles } from '@/utils';
import { useCallback } from 'react';

export const useResetGame = () => {
  const { gameState, updateGameState } = useGameState();
  const { players } = gameState;

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

  const removePlayersWithNoChips = useCallback((updatedPlayers: Player[]) => {
    return updatedPlayers.filter((player) => player.chips > 0);
  }, []);

  const resetGame = useCallback(
    (winner: Player, pot: number) => {
      const oldDealer = players.findIndex((player) => player.isDealer === true);
      const newDealer = findNextDealer(oldDealer, players);

      let updatedPlayers = updatePlayerRoles(
        newDealer,
        gameState.smallBlind,
        gameState.players
      );
      updatedPlayers = addPotToWinner(updatedPlayers, winner, pot);
      updatedPlayers = removePlayersWithNoChips(updatedPlayers);

      const newGameState = {
        ...gameState,
        players: updatedPlayers,
        pot: gameState.smallBlind + gameState.bigBlind,
        highestBet: gameState.bigBlind,
        movesInCurrentStage: 0,
        playersInGame: updatedPlayers.length,
        stage: Stage.PreFlop,
        playerWinner: null,
      };

      updateGameState(newGameState);
    },
    [
      players,
      gameState,
      addPotToWinner,
      removePlayersWithNoChips,
      updateGameState,
    ]
  );

  return { resetGame };
};

export default useResetGame;
