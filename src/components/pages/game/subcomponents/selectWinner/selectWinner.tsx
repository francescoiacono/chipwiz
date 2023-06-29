import { useGameState } from '@/components/providers/gameStateProvider/gameStateProvider';
import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import styles from './selectWinner.module.css';

const SelectWinner = () => {
  const { gameState, updateGameState } = useGameState();
  const { players } = gameState;

  const playersInGame = players.filter((player) => !player.isFolded);

  const handleClick = (playerId: string) => {
    const winnerPlayer = players.find((player) => player.id === playerId);
    if (winnerPlayer) {
      updateGameState({
        ...gameState,
        playerWinner: winnerPlayer,
      });
    } else {
      console.error('Player not found');
    }
  };

  return (
    <>
      Select who won:
      <div className={styles.container}>
        {playersInGame.map((player) => (
          <div className={styles.selectWinner} key={player.id}>
            <label>{player.name}</label>
            <PrimaryButton onClick={() => handleClick(player.id)}>
              Select
            </PrimaryButton>
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectWinner;
