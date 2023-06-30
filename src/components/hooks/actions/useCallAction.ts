import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import { findNextTurn } from '@/utils';

export const useCallAction = () => {
  const { gameState, updateGameState } = useGameState();

  const handleCall = () => {
    if (!gameState) return;

    // Create a deep copy of the game state and players array
    const updatedGameState = { ...gameState, players: [...gameState.players] };
    const { bet, players } = updatedGameState;
    const currentPlayer = players[updatedGameState.turn];

    // Calculate amount of chips that need to be called
    let chipsToCall = bet - currentPlayer.bet;

    // If the player doesn't have enough chips to call, they go all in
    if (chipsToCall > currentPlayer.chips) {
      chipsToCall = currentPlayer.chips;
      currentPlayer.bet += currentPlayer.chips;
      currentPlayer.isAllIn = true;
      currentPlayer.chips = 0;
    } else {
      currentPlayer.bet += chipsToCall;
      currentPlayer.chips -= chipsToCall;
    }

    // Update the pot
    updatedGameState.pot += chipsToCall;

    // Move to next player / stage
    if (updatedGameState.movesInCurrentStage < updatedGameState.playersInGame) {
      updatedGameState.turn = (updatedGameState.turn + 1) % players.length;
    } else {
      let dealerIndex = findNextTurn(updatedGameState.players);
      updatedGameState.turn = dealerIndex;
    }

    // Set the updated game state
    updateGameState(updatedGameState);
  };

  return { handleCall };
};
