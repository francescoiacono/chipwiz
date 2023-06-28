import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import { Player, Stage } from '@/data/types/types';

const FoldAction = () => {
  const { gameState, updateGameState } = useGameState();

  const handleFold = () => {
    if (!gameState) return;

    // Create a deep copy of the game state and players array
    const updatedGameState = { ...gameState, players: [...gameState.players] };
    const { players } = updatedGameState;

    const currentPlayerIndex = updatedGameState.turn;
    const updatedCurrentPlayer = {
      ...players[currentPlayerIndex],
      isFolded: true,
    };
    updatedGameState.players[currentPlayerIndex] = updatedCurrentPlayer;
    updatedGameState.playersInGame -= 1;

    // If players in Game <= 1
    if (updatedGameState.playersInGame <= 1) {
      // End the game
      updatedGameState.stage = Stage.Showdown;
      // Check which player wins
      const winnerIndex = players.findIndex((p: Player) => !p.isFolded);

      if (winnerIndex > -1) {
        const updatedWinner = {
          ...players[winnerIndex],
          chips: players[winnerIndex].chips + updatedGameState.pot,
          isWinner: true,
        };
        players[winnerIndex] = updatedWinner;
      }

      // Set the updated game state
      updateGameState(updatedGameState);
      return;
    }

    // Move to the next player who hasn't folded yet
    do {
      updatedGameState.turn = (updatedGameState.turn + 1) % players.length;
    } while (
      players[updatedGameState.turn].isFolded &&
      players.some((player: Player) => !player.isFolded)
    );

    // Set the updated game state
    updateGameState(updatedGameState);
  };

  return <PrimaryButton onClick={handleFold}>Fold</PrimaryButton>;
};

export default FoldAction;
