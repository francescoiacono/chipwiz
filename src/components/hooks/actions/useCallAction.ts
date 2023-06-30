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
    const chipsToCall = bet - currentPlayer.bet;

    if (chipsToCall > currentPlayer.chips) {
      currentPlayer.bet += currentPlayer.chips;
      currentPlayer.chips = 0;
    } else {
      currentPlayer.bet += chipsToCall;
      currentPlayer.chips -= chipsToCall;
    }

    updatedGameState.pot += chipsToCall;

    if (updatedGameState.movesInCurrentStage < updatedGameState.playersInGame) {
      console.log('moves', updatedGameState.movesInCurrentStage);
      console.log('players', updatedGameState.playersInGame);

      updatedGameState.turn = (updatedGameState.turn + 1) % players.length;
    } else {
      let dealerIndex = findNextTurn(updatedGameState.players);
      console.log('[CALL], Dealer Index:', dealerIndex);

      updatedGameState.turn = dealerIndex;
    }

    console.log('[CALL], Updated Turn:', updatedGameState.turn);

    // Set the updated game state
    updateGameState(updatedGameState);
  };

  return { handleCall };
};
