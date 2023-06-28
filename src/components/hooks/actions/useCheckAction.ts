import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';

export const useCheckAction = () => {
  const { gameState, updateGameState } = useGameState();

  const handleCheck = () => {
    if (!gameState) return;

    const { movesInCurrentStage, playersInGame, players } = gameState;

    // Create a deep copy of the game state
    const updatedGameState = { ...gameState };

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
      if (players[dealerIndex].isFolded) {
        while (players[dealerIndex].isFolded) {
          dealerIndex = (dealerIndex + 1) % players.length;
        }
      }

      updatedGameState.turn = dealerIndex;
    }

    // Set the updated game state
    updateGameState(updatedGameState);
  };

  return { handleCheck };
};
