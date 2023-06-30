import { Player, Stage } from '@/data/types/types';
import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';

export const useFoldAction = () => {
  const { gameState, updateGameState } = useGameState();

  const handleFold = () => {
    if (!gameState) return;

    console.log('[FOLD]');

    // Create a deep copy of the game state and players array
    const updatedGameState = { ...gameState, players: [...gameState.players] };
    const { players } = updatedGameState;

    // Get current player index and create a deep copy of the current player
    // and update isFolded to true
    const currentPlayerIndex = updatedGameState.turn;
    const updatedCurrentPlayer = {
      ...players[currentPlayerIndex],
      isFolded: true,
    };
    updatedGameState.players[currentPlayerIndex] = updatedCurrentPlayer;
    updatedGameState.playersInGame -= 1;

    console.log(
      '[FOLD] Updated Players in game:',
      updatedGameState.playersInGame
    );

    // If players in Game <= 1 then end the game
    if (updatedGameState.playersInGame <= 1) {
      console.log('[FOLD] Players in game <= 1');

      // End the game
      updatedGameState.stage = Stage.Showdown;
      // Find the winner
      const winnerIndex = players.findIndex((p: Player) => !p.isFolded);

      // if there is a winner then update the winner's chips
      if (winnerIndex > -1) {
        const updatedWinner = {
          ...players[winnerIndex],
          chips: players[winnerIndex].chips + updatedGameState.pot,
        };
        updatedGameState.playerWinner = updatedWinner;
      }

      // Set the updated game state
      updateGameState(updatedGameState);
      return;
    }

    // If players in Game > 1 then, move to the next player who hasn't folded yet
    do {
      updatedGameState.turn = (updatedGameState.turn + 1) % players.length;
    } while (
      players[updatedGameState.turn].isFolded &&
      players.some((player: Player) => !player.isFolded)
    );

    // Reduce Moves in current stage
    updatedGameState.movesInCurrentStage -= 1;

    console.log(
      '[FOLD] Updated Moves in current stage:',
      updatedGameState.movesInCurrentStage
    );

    // Set the updated game state
    updateGameState(updatedGameState);
  };

  return { handleFold };
};
