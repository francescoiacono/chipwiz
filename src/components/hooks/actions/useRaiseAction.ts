import { useState } from 'react';
import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';

export const useRaiseAction = () => {
  const [raiseAmount, setRaiseAmount] = useState<number>(0);
  const { gameState, updateGameState } = useGameState();

  const handleRaise = () => {
    if (!gameState) return;

    // Create a deep copy of the game state and players array
    const updatedGameState = { ...gameState, players: [...gameState.players] };
    const { players } = updatedGameState;
    const currentPlayer = players[updatedGameState.turn];

    if (raiseAmount > currentPlayer.chips) {
      alert('You cannot raise more than you have!');
      return;
    }

    currentPlayer.bet += raiseAmount;
    currentPlayer.chips -= raiseAmount;

    updatedGameState.highestBet += raiseAmount;
    updatedGameState.pot += raiseAmount;
    updatedGameState.bet = currentPlayer.bet; // Update the current bet to match the raise
    updatedGameState.turn = (updatedGameState.turn + 1) % players.length;
    updatedGameState.movesInCurrentStage = 1;

    // Set the updated game state
    updateGameState(updatedGameState);
    // Reset the raise amount
    setRaiseAmount(0);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRaiseAmount(e.target.valueAsNumber);
  };

  return { raiseAmount, handleRaise, handleSliderChange, setRaiseAmount };
};
