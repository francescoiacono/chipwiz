import styles from './gamePot.module.css';

interface GamePotProps {
  pot: number;
}

const GamePot = ({ pot }: GamePotProps) => {
  return (
    <div className={styles.gamePot}>
      <h2 className={styles.potTitle}>Pot</h2>
      <p className={styles.potValue}>{pot} 💰</p>
    </div>
  );
};

export default GamePot;
