import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import { Player, Stage } from '@/data/types/types';
import styles from './showWinner.module.css';
import { useResetGame } from '@/components/hooks/actions';

interface ShowWinnerProps {
  playerWinner: Player;
  pot: number;
}

const ShowWinner = ({ playerWinner, pot }: ShowWinnerProps) => {
  const { resetGame } = useResetGame();

  return (
    <div className={styles.showWinner}>
      <h1>Congratulations!</h1>
      {playerWinner.name} wins the pot!
      <span className={styles.positive}>{`(+${pot})`}</span>
      <PrimaryButton onClick={() => resetGame(playerWinner, pot)}>
        Continue
      </PrimaryButton>
    </div>
  );
};

export default ShowWinner;
