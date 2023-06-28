import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';

const CheckAction = () => {
  const { gameState, updateGameState } = useGameState();

  const handleCheck = () => {
    if (!gameState) return;

    // Create a deep copy of the game state
    const updatedGameState = { ...gameState };

    // Move to the next player
    updatedGameState.turn =
      (updatedGameState.turn + 1) % updatedGameState.players.length;

    // Set the updated game state
    updateGameState(updatedGameState);
  };

  return <PrimaryButton onClick={handleCheck}>Check</PrimaryButton>;
};

export default CheckAction;
