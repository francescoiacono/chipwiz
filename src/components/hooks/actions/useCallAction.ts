import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';

export const useCallAction = () => {
  const { gameState, updateGameState } = useGameState();

  const handleCall = () => {
    console.log('[CALL]');
    if (!gameState) return;

    // Create a deep copy of the game state and players array
    const updatedGameState = { ...gameState, players: [...gameState.players] };
    const { bet, players } = updatedGameState;
    const currentPlayer = players[updatedGameState.turn];
    const chipsToCall = bet - currentPlayer.bet;

    if (chipsToCall > currentPlayer.chips) {
      currentPlayer.bet += currentPlayer.chips;
      currentPlayer.chips = 0;
    } else {
      currentPlayer.bet += chipsToCall;
      currentPlayer.chips -= chipsToCall;
    }

    updatedGameState.pot += chipsToCall;
    updatedGameState.turn = (updatedGameState.turn + 1) % players.length;

    // Set the updated game state
    updateGameState(updatedGameState);
  };

  return { handleCall };
};
