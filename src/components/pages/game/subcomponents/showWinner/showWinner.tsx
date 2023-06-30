import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import { Player, Stage } from '@/data/types/types';
import styles from './showWinner.module.css';
import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import updatePlayerRoles from '@/utils/updatePlayerRoles/updatePlayerRoles';

interface ShowWinnerProps {
  playerWinner: Player;
  pot: number;
}

const ShowWinner = ({ playerWinner, pot }: ShowWinnerProps) => {
  const { gameState, updateGameState } = useGameState();
  const { players } = gameState;
  const handleReset = () => {
    const oldDealer = players.findIndex((player) => player.isDealer === true);
    const newDealer = (oldDealer + 1) % players.length;

    const updatedPlayers = updatePlayerRoles(
      newDealer,
      gameState.smallBlind,
      players
    );

    // Add pot to winner's chip stack in updatedPlayers
    const winnerIndex = updatedPlayers.findIndex(
      (player) => player.name === playerWinner.name
    );
    updatedPlayers[winnerIndex].chips += pot;

    updateGameState({
      ...gameState,
      players: updatedPlayers,
      pot: gameState.smallBlind + gameState.bigBlind,
      highestBet: gameState.bigBlind,
      movesInCurrentStage: 0,
      playersInGame: players.length,
      stage: Stage.PreFlop,
      playerWinner: null,
    });
  };
  return (
    <div className={styles.showWinner}>
      <h1>Congratulations!</h1>
      {playerWinner.name} wins the pot!
      <span className={styles.positive}>{`(+${pot})`}</span>
      <PrimaryButton onClick={handleReset}>Continue</PrimaryButton>
    </div>
  );
};

export default ShowWinner;
