import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import { Player } from '@/data/types/types';
import styles from './showWinner.module.css';

interface ShowWinnerProps {
  playerWinner: Player;
  pot: number;
}

const ShowWinner = ({ playerWinner, pot }: ShowWinnerProps) => {
  return (
    <div className={styles.showWinner}>
      <h1>Congratulations!</h1>
      {playerWinner.name} wins the pot!
      <span className={styles.positive}>{`(+${pot})`}</span>
      <PrimaryButton>Continue</PrimaryButton>
    </div>
  );
};

export default ShowWinner;
