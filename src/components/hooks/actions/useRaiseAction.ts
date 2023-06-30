import { useState } from 'react';
import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';

export const useRaiseAction = () => {
  const { gameState, updateGameState } = useGameState();
  const [raiseAmount, setRaiseAmount] = useState<number>(gameState?.smallBlind);

  const handleRaise = () => {
    if (!gameState) return;

    console.log('[RAISE] Amount:', raiseAmount);

    // Create a deep copy of the game state and players array
    const updatedGameState = { ...gameState, players: [...gameState.players] };
    const { players } = updatedGameState;
    const currentPlayer = players[updatedGameState.turn];

    if (raiseAmount > currentPlayer.chips) {
      alert('You cannot raise more than you have!');
      return;
    }

    // Update the current player's bet and chips
    currentPlayer.bet += raiseAmount;
    currentPlayer.chips -= raiseAmount;

    // Update the game state
    updatedGameState.highestBet += raiseAmount;
    updatedGameState.pot += raiseAmount;
    updatedGameState.bet = currentPlayer.bet; // Update the current bet to match the raise
    updatedGameState.turn = (updatedGameState.turn + 1) % players.length;
    updatedGameState.movesInCurrentStage = 1;

    // Set the updated game state
    updateGameState(updatedGameState);
    // Reset the raise amount
    setRaiseAmount(updatedGameState.smallBlind);
  };

  // Update the raise amount when the slider changes
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRaiseAmount(e.target.valueAsNumber);
  };

  return { raiseAmount, handleRaise, handleSliderChange, setRaiseAmount };
};
