import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import { useStage } from '../game';

export const useCheckAction = () => {
  const { gameState, updateGameState } = useGameState();
  const { handleStageUpdate } = useStage();

  const handleCheck = () => {
    if (!gameState) return;

    const { movesInCurrentStage, playersInGame, players } = gameState;

    // Create a deep copy of the game state
    const updatedGameState = { ...gameState };

    // Move to next player / stage
    if (movesInCurrentStage < playersInGame) {
      updatedGameState.turn =
        (updatedGameState.turn + 1) % updatedGameState.players.length;
    } else {
      // Find the delaer index and if it's the same as the current one, move to the next stage
      let dealerIndex = players.findIndex((player) => player.isDealer);
      if (dealerIndex === updatedGameState.turn) {
        handleStageUpdate();
      }
      updatedGameState.turn = dealerIndex;
    }

    // Set the updated game state
    updateGameState(updatedGameState);
  };

  return { handleCheck };
};
