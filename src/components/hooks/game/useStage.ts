import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import { Player } from '@/data/types/types';
import { updateGameStage } from '@/utils';

export const useStage = () => {
  const { gameState, updateGameState } = useGameState();
  const { players, highestBet, movesInCurrentStage, playersInGame, stage } =
    gameState;

  const handleStageUpdate = () => {
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
      sameDealer: false,
    });
  };

  return { handleStageUpdate };
};
