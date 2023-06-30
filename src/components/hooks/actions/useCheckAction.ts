import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import { useStage } from '../game';

export const useCheckAction = () => {
  const { gameState, updateGameState } = useGameState();

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
      // Find the current dealer
      let dealerIndex = players.findIndex((player) => player.isDealer);

      // Turn boolean to true when current dealer and turn are the same
      // to trigger component update
      if (updatedGameState.turn === dealerIndex) {
        updatedGameState.sameDealer = true;
      }

      updatedGameState.turn = dealerIndex;
    }

    // Set the updated game state
    updateGameState(updatedGameState);
  };

  return { handleCheck };
};
