import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import { useCurrentPlayer } from '../game';

export const useCheckAction = () => {
  const { gameState, updateGameState } = useGameState();
  const { updateStage } = useCurrentPlayer();

  const handleCheck = () => {
    if (!gameState) return;

    const { movesInCurrentStage, playersInGame, players } = gameState;

    // Create a deep copy of the game state
    const updatedGameState = { ...gameState };
    console.log('[CHECK] Moves in current stage:', movesInCurrentStage);
    console.log('[CHECK] Players in game:', playersInGame);

    if (movesInCurrentStage < playersInGame) {
      // Move to the next player
      console.log('Moving to next player');
      updatedGameState.turn =
        (updatedGameState.turn + 1) % updatedGameState.players.length;
    } else {
      console.log(
        "Moving to dealer or player who hasn't folded yet (from dealer)"
      );
      let dealerIndex = players.findIndex((player) => player.isDealer);
      if (dealerIndex === updatedGameState.turn) {
        updateStage();
      }
      updatedGameState.turn = dealerIndex;
    }

    // Set the updated game state
    updateGameState(updatedGameState);
  };

  return { handleCheck };
};
